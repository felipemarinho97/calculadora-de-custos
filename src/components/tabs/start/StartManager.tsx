import React from "react";
import { Layout } from "antd";
import GasCard from "./GasCard";

const { Content } = Layout;

class StartManager extends React.Component {
  public render(): JSX.Element {
    return (
      <Layout
        className="site-layout-background"
        style={{ padding: "24px 0", marginTop: "48px" }}
      >
        <Content>
          Clique em "Produtos" ou "Receitas".
          <br />
          Você também pode carregar ou salvar um arquivo de um projeto anterior.
          <GasCard />
        </Content>
      </Layout>
    );
  }
}

export default StartManager;
