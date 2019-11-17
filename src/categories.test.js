import { createParentChildDict, createCategoriesVM } from './create-categories-vm';

it('should convert categories model to VM', () => {
  const categories = [
    { id: 'delta',  parent: 'beta',    name: 'this is delta'   },
    { id: 'alpha',  parent: '',        name: 'this is alpha'   },
    { id: 'beta',   parent: '',        name: 'this is beta'    },
    { id: 'zeta',   parent: 'epsilon', name: 'this is zeta'    },
    { id: 'gamma',  parent: 'beta',    name: 'this is gamma'   },
    { id: 'epsilon',parent: 'beta',    name: 'this is epsilon' },
  ];

  const expected = [
    {id: 'alpha', name: 'this is alpha', type:"leaf"},
    {id: 'beta', name: 'this is beta', type:"container", children: [
      {id: 'delta', name: 'this is delta', type: 'leaf'},
      {id: 'epsilon', name: 'this is epsilon', type: 'container', children: [
        {id: 'zeta', name: 'this is zeta', type: 'leaf'},
      ]},
      {id: 'gamma', name: 'this is gamma', type: 'leaf'},
    ]},
  ];

  expect(createCategoriesVM(categories)).toEqual(expected);
});
