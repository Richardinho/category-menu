import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect';
import { createCategoriesVM } from './create-categories-vm';

const onClick = ({ event, props }) => console.log(event,props);
function fireDeleteCategoryAction(id, dispatch) {
  dispatch({type: 'DELETE_CATEGORY_ACTION', id});
}

function fireAddChildAction(id, dispatch) {
  dispatch({type: 'ADD_CHILD_ACTION', parentId: id});
}

function getContextMenu(type, id, dispatch, categories) {
  return (type === 'leaf') ? <LeafMenu categories={categories} id={id} dispatch={dispatch}/> : <ContainerMenu categories={categories}id={id} dispatch={dispatch}/>;
}

const ContainerMenu = ({id, dispatch}) => (
    <Menu id={id}>
      <Item onClick={() => {fireDeleteCategoryAction(id, dispatch)}}>Delete category</Item>
      <Item onClick={(props) => {fireAddChildAction(id, dispatch)}}>Add child category</Item>
    </Menu>
);

const LeafMenu = ({id, dispatch}) => (
    <Menu id={id}>
      <Item onClick={() => {fireDeleteCategoryAction(id, dispatch)}}>Delete category</Item>
    </Menu>
);

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const ContextMenu = ({id, categoryName, type, dispatch, categories}) => {
  return (

  <>
    <MenuProvider id={id} style={{ border: '1px solid purple' }}>
      {categoryName}
    </MenuProvider>
    {getContextMenu(type, id, dispatch, categories)}
  </>
)};

const selectCategories = createSelector(
  state => state.categories,
  categories => createCategoriesVM(categories) 
);

export default function MyMenu() {
  const classes = useStyles();
  const categories = useSelector(selectCategories);
  const rawCategories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  function getContextMenu(category, dispatch, categories) {
    return (<ContextMenu
      id={category.id}
      dispatch={dispatch}
      type={category.type}
      categories={categories}
      categoryName={category.name}/>
    );
  }

  function createTreeItem(category, dispatch, categories) {
    if(category.type === 'leaf') {
      return (

        <TreeItem
          key={category.id}
          nodeId={category.id}
          label={getContextMenu(category, dispatch, categories)}
        />
      );
    } else {
    
      return (
        <TreeItem
          key={category.id}
          nodeId={category.id}
          label={getContextMenu(category, dispatch, categories)}>
          {category.children.map((cat) => createTreeItem(cat, dispatch))}
        </TreeItem>
      )
    }
  }

  return (
    <>
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {
        categories.map(category => createTreeItem(category, dispatch, rawCategories))
      }
    </TreeView>
    </>
  );
}
