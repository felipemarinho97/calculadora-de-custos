import { Layout, Menu } from "antd";
import React, { FC } from "react";
import "./Home.css";
import ProductsManager from "../tabs/products/ProductsManager";
import RecipesManager from "../tabs/recipes/RecipesManager";
import { ClickParam } from "antd/lib/menu";
import { Link, Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { IAppState } from "../../App";
import { store } from "../../App";
import { saveAs } from "file-saver";
import { loadState } from "../../actions/persistor.action";
import { BookFilled, ShoppingFilled, SaveFilled, HomeFilled, FolderOpenFilled } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export function getProjectName(
  now: Date = new Date(),
  prefix: string = `Projeto_sem_nome`
): string {
  return `${prefix}-${now.toLocaleDateString()}-${now.toLocaleTimeString()}`;
}

class Home extends React.Component<RouteComponentProps> {
  private fileReader: FileReader;

  constructor(props: RouteComponentProps) {
    super(props);

    this.onMenuClick = this.onMenuClick.bind(this);

    this.fileReader = new FileReader();
  }

  private onChooseChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.handleFileChosen(e.target.files![0]);
  };

  private handleFileRead(fileReader: FileReader): void {
    const content: string = fileReader.result as string;
    const state: IAppState = JSON.parse(content).root;

    const applyNewState: () => void = (): void => {
      console.log(content, state);
      store.dispatch(loadState(state));
    };

    applyNewState();
  }

  private handleFileChosen(file: File): void {
    this.fileReader = new FileReader();

    this.fileReader.onloadend = (): void => {
      this.handleFileRead(this.fileReader);
    };
    this.fileReader.readAsText(file);
  }

  public localSave: () => void = (): void => {
    const state: IAppState = store.getState();

    const myStore: string = JSON.stringify(state);
    const file: File = new File([myStore], `${getProjectName()}.json`, {
      type: "text/json;charset=utf-8",
    });
    saveAs(file);
  };

  private onMenuClick(param: ClickParam): void {
    if (param.key === "0") {
      this.props.history.push('/')
    }
    if (param.key === "4") {
      this.localSave();
    }
  }

  public render(): JSX.Element {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
            <Menu.Item onClick={this.onMenuClick} key="0" icon={<HomeFilled />} />

            {/* </Menu.Item> */}
            <Menu.Item onClick={this.onMenuClick} icon={<BookFilled />} key="1">
              <Link to="/recipes">
                Receitas
              </Link>
            </Menu.Item>
            <Menu.Item onClick={this.onMenuClick} icon={<ShoppingFilled />} key="2">
              <Link to="/products">
                Produtos
              </Link>
            </Menu.Item>
            <Menu.Item onClick={this.onMenuClick} icon={<SaveFilled />} key="4">
              Salvar
            </Menu.Item>
            <Menu.Item onClick={this.onMenuClick} icon={<FolderOpenFilled />} key="3">
              <input
                type="file"
                accept=".json"
                onChange={this.onChooseChange}
                style={{ maxWidth: "150px" }}
              />
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="layout-parent"
          style={{ padding: "0 50px", height: "100%" }}
        >
          <Switch>
            <Route path="/recipes">
              <RecipesManager />
            </Route>
            <Route path="/products">
              <ProductsManager />
            </Route>
            <Route path="/">
              <br />
              <br />
              Clique em "Produtos" ou "Receitas".
              <br />
              Você também pode carregar ou salvar um arquivo de um projeto
              anterior.
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Calculadora de Custos ©2020 Criado por Felipe Marinho
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(Home);
