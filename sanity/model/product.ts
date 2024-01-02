import { defineType, defineField, defineArrayMember } from 'sanity';

export const product = defineType({
    title: 'Products',
    name: 'product',
    type: 'document',
    fields: [
        defineField({
            title: 'Name',
            name: 'name',
            type: 'string',
        }),
        defineField({
            title: 'Images',
            name: 'image',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                }),
            ],
        }),
    ],
});
