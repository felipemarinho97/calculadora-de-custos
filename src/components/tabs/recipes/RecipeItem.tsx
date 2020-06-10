import React from "react";
import { Recipe } from "../../../types/recipes.types";
import { List, Descriptions, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Product } from "../../../types/products.types";
import { Link } from "react-router-dom";

interface IRecipeItemProps {
  recipe: Recipe;
  products: Product[];
  deleteRecipe: (id: string) => void;
}

class RecipeItem extends React.Component<IRecipeItemProps> {
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
    const { recipe, deleteRecipe } = this.props;
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
            <Popconfirm onConfirm={() => deleteRecipe(recipe.id)} title="Tem certeza?" okText="Sim" cancelText="Não">
              <a
                key="list-action-delete"
              >
                <DeleteOutlined />
                <span className="action-name"> Apagar</span>
              </a>
            </Popconfirm>
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
                  {recipe.items.map((item, index) => {
                    const product: Product | undefined = this.getProduct(
                      item.productId
                    );

                    if (product != null)
                      return (
                        <>
                          <span>
                            {item.amount}x porção de {item.volume}
                            {product.unit} de{" "}
                            <span title={`R$ ${product.price.toFixed(2)}`}>
                              {product.name}
                            </span>
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
                  })}
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

  private getRecipeTotalCost(recipe: Recipe) {
    return recipe.items
      .map(
        (item) =>
          item.amount *
          item.volume *
          this.getProductProportionalPrice(item.productId)
      )
      .reduce((acumulador, valorAtual) => acumulador + valorAtual);
  }
}

export default RecipeItem;
