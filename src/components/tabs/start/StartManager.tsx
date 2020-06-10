import React from "react";
import { Layout } from "antd";

class StartManager extends React.Component {
  public render(): JSX.Element {
    return (
      <Layout>
        <br />
        <br />
        Clique em "Produtos" ou "Receitas".
        <br />
        Você também pode carregar ou salvar um arquivo de um projeto anterior.
      </Layout>
    );
  }
}

export default StartManager;
