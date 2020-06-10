import React from "react";
import {
  Recipe,
  RecipeItem as RecipeItemType,
} from "../../../types/recipes.types";
import { List, Descriptions, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Product } from "../../../types/products.types";
import { Link } from "react-router-dom";
import { Gas } from "../../../types/gas.types";
import { IPersistorState } from "../../../reducers/persistor.reducer";
import { connect } from "react-redux";

interface IRecipeItemProps {
  recipe: Recipe;
  products: Product[];
  deleteRecipe: (id: string) => void;
}

type Props = IStateToProps & IRecipeItemProps;

class RecipeItem extends React.Component<Props> {
  private getProductProportionalPrice(productId: string): number {
    const result: Product | undefined = this.getProduct(productId);

    if (result !== undefined) {
      return result.price / result.volume;
    }

    return 0;
  }

  private getProduct(productId: string): Product | undefined {
    const { products } = this.props;

    return products.find((p: Product) => p.id === productId);
  }

  public render(): JSX.Element {
    const { recipe, deleteRecipe, gas } = this.props;
    const totalCost = this.getRecipeTotalCost(recipe);
    const showUnitCost: boolean = recipe.output > 1;

    const UnitCost: JSX.Element | undefined = showUnitCost ? (
      <Descriptions.Item label="Custo unitário">
        {"R$ "}
        {(totalCost / recipe.output).toFixed(2)}
      </Descriptions.Item>
    ) : undefined;

    return (
      <>
        <List.Item
          key={recipe.id}
          actions={[
            <Link to={{ pathname: "/recipes/edit", state: recipe }}>
              <EditOutlined />
              <span className="action-name"> Editar</span>
            </Link>,
            <Popconfirm
              onConfirm={() => deleteRecipe(recipe.id)}
              title="Tem certeza?"
              okText="Sim"
              cancelText="Não"
            >
              <a key="list-action-delete">
                <DeleteOutlined />
                <span className="action-name"> Apagar</span>
              </a>
            </Popconfirm>,
          ]}
        >
          <List.Item.Meta
            description={
              <Descriptions
                layout="vertical"
                title={`${recipe.name} (${recipe.output} und.)`}
                size="small"
                bordered={true}
              >
                <Descriptions.Item
                  label="Items"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {this.renderAllRecipeItems(recipe)}
                  {this.renderGasLine(recipe, gas)}
                </Descriptions.Item>
                {UnitCost}
                <Descriptions.Item label="Custo Total">
                  R$ {totalCost.toFixed(2)}
                </Descriptions.Item>
              </Descriptions>
            }
          />
        </List.Item>
      </>
    );
  }

  private renderAllRecipeItems(recipe: Recipe): React.ReactNode {
    return recipe.items.map((item, index) => {
      const product: Product | undefined = this.getProduct(item.productId);
      if (product != null) return this.renderRecipeLine(item, product);
    });
  }

  private renderRecipeLine(
    item: RecipeItemType,
    product: Product
  ): JSX.Element {
    if (product.unit === "Und") {
      return (
        <>
          <span>
            {item.amount * item.volume}x unidade(s) de{" "}
            <span title={`R$ ${product.price.toFixed(2)}`}>{product.name}</span>
          </span>
          <span style={{ marginLeft: "auto", marginTop: -22 }}>
            {"R$ "}
            {(
              item.amount *
              item.volume *
              this.getProductProportionalPrice(item.productId)
            ).toFixed(2)}
          </span>
          <br />
        </>
      );
    }

    return (
      <>
        <span>
          {item.amount}x porção de {item.volume}
          {product.unit} de{" "}
          <span title={`R$ ${product.price.toFixed(2)}`}>{product.name}</span>
        </span>
        <span style={{ marginLeft: "auto", marginTop: -22 }}>
          {"R$ "}
          {(
            item.amount *
            item.volume *
            this.getProductProportionalPrice(item.productId)
          ).toFixed(2)}
        </span>
        <br />
      </>
    );
  }

  private renderGasLine(recipe: Recipe, gas: Gas): React.ReactNode {
    if (recipe.preparationTime === 0) {
      return <></>;
    }

    return (
      <>
        <span>{recipe.preparationTime} minutos de forno</span>
        <span style={{ marginLeft: "auto", marginTop: -22 }}>
          {"R$ "}
          {this.getGasCost(recipe, gas).toFixed(2)}
        </span>
        <br />
      </>
    );
  }

  private getGasCost(recipe: Recipe, gas: Gas) {
    return (recipe.preparationTime / 60) * gas.gas * (gas.gasPrice / 13);
  }

  private getRecipeTotalCost(recipe: Recipe) {
    const { gas } = this.props;
    return (
      recipe.items
        .map(
          (item) =>
            item.amount *
            item.volume *
            this.getProductProportionalPrice(item.productId)
        )
        .reduce((acumulador, valorAtual) => acumulador + valorAtual) +
      this.getGasCost(recipe, gas)
    );
  }
}

interface IStateToProps {
  gas: Gas;
}

function mapStateToProps(state: IPersistorState): IStateToProps {
  return {
    gas: state.root.gas,
  };
}

export default connect(mapStateToProps)(RecipeItem);
