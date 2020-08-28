import { FuseNavigation } from '@fuse/types';

// Navigation for every user except breeder
export const navigation: FuseNavigation[] = [
    {
        id: 'menu_item1',
        title: 'Menu Item 1',
        type: 'group',
        children: [
            {
                id: 'menu_subitem1',
                title: 'Menu Sub Item 1',
                type: 'item',
                icon: 'pets',
                url: '/',
                hidden: true,
                permission: []
            },

        ]
    }
];
