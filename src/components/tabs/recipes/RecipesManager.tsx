import { Layout, Menu } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import React, { Dispatch } from "react";
import { Product } from "../../../types/products.types";
import { ProductsAction } from "../../../reducers/products.reducer";
import { addProduct } from "../../../actions/products.action";
import { connect } from "react-redux";
import RecipesDisplay from "./RecipesDisplay";
import { Link, Switch, Route } from "react-router-dom";
import RecipeAddDisplay from "./RecipeAddDisplay";
import RecipeEditDisplay from "./RecipeEditDisplay";

const { Content, Sider } = Layout;

interface IRecipesManagerState {
  addItemModalVisible: boolean;
}

class RecipesManager extends React.Component<
  IDispatchToProps,
  IRecipesManagerState
> {
  constructor(props: IDispatchToProps) {
    super(props);

    this.state = {
      addItemModalVisible: false,
    };

    this.onAddItemClick = this.onAddItemClick.bind(this);
    this.onAddItemClose = this.onAddItemClose.bind(this);
  }

  private onAddItemClick(): void {
    this.setState({ addItemModalVisible: true });
  }

  private onAddItemClose(): void {
    this.setState({ addItemModalVisible: false });
  }

  public render(): JSX.Element {
    const { addItemModalVisible } = this.state;

    return (
      <>
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0", marginTop: "48px" }}
        >
          <Sider
            collapsible
            theme="light"
            breakpoint="md"
            className="site-layout-background"
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <Menu.Item
                onClick={this.onAddItemClick}
                icon={<AppstoreAddOutlined />}
                key="cad"
              >
                <Link to="/recipes/add">Cadastrar Receita</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="layout-manager">
            <Switch>
              <Route path="/recipes/add">
                <RecipeAddDisplay />
              </Route>
              <Route path="/recipes/edit">
                <RecipeEditDisplay />
              </Route>
              <Route path="/recipes">
                <RecipesDisplay />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </>
    );
  }
}

interface IDispatchToProps {
  addProduct: (product: Product) => void;
}

function mapDispatchToProps(
  dispatch: Dispatch<ProductsAction>
): IDispatchToProps {
  return {
    addProduct: (product: Product) => {
      dispatch(addProduct(product));
    },
  };
}

export default connect(null, mapDispatchToProps)(RecipesManager);
