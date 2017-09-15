# Instructions for adding pages to the left menu:

All pages are in a file app/pages/pages.menu.ts

For example:
```
export const PAGES_MENU = [
   {
     path: 'pages',
     children: [
       {
         path: 'dashboard',
         data: {
           menu: {
             title: 'general.menu.dashboard',
             icon: '',
             selected: false,
             expanded: false,
             order: 0,
           },
         },
       },
     ],
   },
 ];
```

Where

path: pages - indicates the path to main module
```
children - indicates the sub-items of the menu
  path: 'dashboard' - indicates the path to sub-item
    title: 'general.menu.dashboard' - name for sub-item
    icon: '' - set icon for sub-item
    selected: false - option for selected sub-iem
    expanded: false - option for expanded sub-iem
    order: 0 - option for set position in menu
```
