
function comparator(a, b) {
  if(a.id > b.id) {
    return 1;
  } else if(a.id < b.id) {
    return -1;
  } else {
    return 0;
  }
}

function getChildren(categories, parent) {
  return categories.filter(category => {
    return category.parent === parent;
  }).map(category => {
    const children = getChildren(categories, category.id);

    if (children.length) {
      return {
        id: category.id,
        name: category.name,
        children: getChildren(categories, category.id),
        type: 'container',
      };
    } else {
      return {
        id: category.id,
        name: category.name,
        type: 'leaf',
      };
    }
  }).sort(comparator);
}

export const createCategoriesVM = categories => getChildren(categories, '');
