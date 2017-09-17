import * as xdom2jso from 'autopulous-xdom2jso';

import { Injectable } from '@angular/core';

@Injectable()
export class SoapService {
  private debug = false;
  private asynchronous = true;
  private localName = false;

  private servicePort = '';
  private servicePath = '';
  private serviceUrl = '';

  private targetNamespace = '';

  private envelopeBuilderValue: (requestBody: string) => string = null;
  private xmlResponseHandlerValue: (response: NodeListOf<Element>) => void = null;
  private jsoResponseHandlerValue: (response: {}) => void = null;

  constructor() {
  }

  public setUp(servicePort: string, servicePath: string, targetNamespace?: string) {
    this.servicePort = servicePort;
    this.servicePath = servicePath;
    this.serviceUrl = servicePort + servicePath;

    if (undefined !== targetNamespace) {
      this.targetNamespace = targetNamespace;
    }
  }

  set envelopeBuilder(envelopeBuilder: (response: {}) => string) {
    this.envelopeBuilderValue = envelopeBuilder;
  }

  set jsoResponseHandler(responseHandler: (response: {}) => void) {
    this.jsoResponseHandlerValue = responseHandler;
  }

  set xmlResponseHandler(responseHandler: (response: NodeListOf<Element>) => void) {
    this.xmlResponseHandlerValue = responseHandler;
  }

  set localNameMode(on: boolean) {
    this.localName = on;
  }

  set debugMode(on: boolean) {
    this.debug = on;
  }

  set testMode(on: boolean) {
    this.debug = on;
    this.asynchronous = !on;
  }

  public post(method: string, parameters: any, responseRoot?: string): void {
    const request: string = this.toXml(parameters);
    const envelopedRequest: string = null !== this.envelopeBuilderValue ? this.envelopeBuilderValue(request) : request;

    const xmlHttp: XMLHttpRequest = new XMLHttpRequest();

    xmlHttp.onreadystatechange = () => {
      if (4 === xmlHttp.readyState) {
        let responseNodeList: NodeListOf<Element>;

        if (!responseRoot) {
          return;
        }
        responseNodeList = xmlHttp.responseXML.getElementsByTagNameNS('*', responseRoot);


        if (null !== this.xmlResponseHandlerValue) {
          this.xmlResponseHandlerValue(responseNodeList);
        }

        if (null !== this.jsoResponseHandlerValue) {
          const response: {} = xdom2jso.convert(responseNodeList[0], this.localName);

          this.jsoResponseHandlerValue(response);
        }
      }
    };

    xmlHttp.open('POST', this.serviceUrl, this.asynchronous);

    xmlHttp.setRequestHeader('SOAPAction', `${this.targetNamespace}/${encodeURIComponent(method)}`);
    xmlHttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');

    xmlHttp.send(envelopedRequest);
  }

  private toXml(parameters: any): string {
    let xml: string = '';

    switch (typeof(parameters)) {
      case 'string':
        xml += parameters.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        break;

      case 'number':
      case 'boolean':
        xml += parameters.toString();
        break;

      case 'object':
        if (parameters.constructor.toString().indexOf('function Date()') > -1) {
          const year: string = parameters.getFullYear().toString();
          const month: string = (`0${parameters.getMonth() + 1}`).slice(-2);
          const date: string = (`0${parameters.getDate()}`).slice(-2);
          const hours: string = (`0${parameters.getHours()}`).slice(-2);
          const minutes: string = (`0${parameters.getMinutes()}`).slice(-2);
          const seconds: string = (`0${parameters.getSeconds()}`).slice(-2);
          const milliseconds: string = parameters.getMilliseconds().toString();

          let tzOffsetMinutes: number = Math.abs(parameters.getTimezoneOffset());
          let tzOffsetHours: number = 0;

          while (tzOffsetMinutes >= 60) {
            tzOffsetHours++;
            tzOffsetMinutes -= 60;
          }

          const tzMinutes = (`0${tzOffsetMinutes}`).slice(-2);
          const tzHours = (`0${tzOffsetHours}`).slice(-2);

          const timezone = `${((parameters.getTimezoneOffset() < 0) ? '-' : '+')}${tzHours}:${tzMinutes}`;

          xml += `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.${milliseconds}${timezone}`;
        } else if (parameters.constructor.toString().indexOf('function Array()') > -1) { // Array
          for (const parameter in parameters) {
            if (parameters.hasOwnProperty(parameter)) {
              if (parameter) {  // linear array
                (/function\s+(\w*)\s*\(/ig).exec(parameters[parameter].constructor.toString());

                let type = RegExp.$1;

                switch (type) {
                  case '':
                    type = typeof(parameters[parameter]);
                    break;
                  case 'String':
                    type = 'string';
                    break;
                  case 'Number':
                    type = 'int';
                    break;
                  case 'Boolean':
                    type = 'bool';
                    break;
                  case 'Date':
                    type = 'DateTime';
                    break;
                }
                xml += this.toElement(type, parameters[parameter]);
              } else { // associative array
                xml += this.toElement(parameter, parameters[parameter]);
              }
            }
          }
        } else { // Object or custom function
          for (const parameter in parameters) {
            if (parameters.hasOwnProperty(parameter)) {
              xml += this.toElement(parameter, parameters[parameter]);
            }
          }
        }
        break;

      default:
        throw new Error(`SoapService error: type ${typeof(parameters)} is not supported`);
    }

    return xml;
  }

  private toElement(tagNamePotentiallyWithAttributes: string, parameters: any): string {
    const elementContent: string = this.toXml(parameters);

    if ('' === elementContent) {
      return `<${tagNamePotentiallyWithAttributes}/>`;
    } else {
      return `<${tagNamePotentiallyWithAttributes}>${elementContent}` +
        `</${SoapService.stripTagAttributes(tagNamePotentiallyWithAttributes)}>`;
    }
  }

  private static stripTagAttributes(tagNamePotentiallyWithAttributes: string): string {
    tagNamePotentiallyWithAttributes = `${tagNamePotentiallyWithAttributes} `;

    return tagNamePotentiallyWithAttributes.slice(0, tagNamePotentiallyWithAttributes.indexOf(' '));
  }
}
