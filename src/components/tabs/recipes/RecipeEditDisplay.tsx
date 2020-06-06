import React, { Dispatch } from "react";
import { Product } from "../../../types/products.types";
import { ProductsAction } from "../../../reducers/products.reducer";
import { updateProduct, deleteProduct } from "../../../actions/products.action";
import { connect } from "react-redux";
import { IAppState } from "../../../App";
import {
  List,
  Input,
  Button,
  Radio,
  InputNumber,
  Form,
  Space,
  Select,
} from "antd";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import {
  BackwardFilled,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import { Recipe } from "../../../types/recipes.types";
import { addRecipe, updateRecipe } from "../../../actions/recipes.action";
import { RecipesAction } from "../../../reducers/recipes.reducer";
import md5 from "md5";
import { IPersistorState } from "../../../reducers/persistor.reducer";

interface IRecipeEditDisplayState {
  searchTerm: string;
}

class RecipeEditDisplayO extends React.Component<
  IDispatchToProps & IStateToProps & RouteComponentProps,
  IRecipeEditDisplayState
> {
  constructor(props: IDispatchToProps & IStateToProps & RouteComponentProps) {
    super(props);

    this.state = {
      searchTerm: "",
    };

    this.onEditItemFinish = this.onEditItemFinish.bind(this);
  }

  private onEditItemFinish(store: Store): void {
    const { editRecipe, location, history } = this.props;

    const recipe: Recipe = store as Recipe;

    const toEdit: Recipe | undefined = location.state as Recipe;

    if (toEdit !== undefined) {
      recipe.id = toEdit.id;

      editRecipe(recipe);

      history.push("/recipes");
    }
  }

  public render(): JSX.Element {
    const { products, location, history } = this.props;

    const toEdit: Recipe | undefined = location.state as Recipe;

    if (toEdit === undefined) {
      history.goBack();
    }

    return (
      <>
        <Link to="/recipes">
          <Button icon={<BackwardFilled />}> Voltar</Button>
        </Link>
        <br />
        <br />
        <h2>Editar Receita</h2>
        <br />
        <Form
          onFinish={this.onEditItemFinish}
          title="Editar Receita"
          name="editRecipe"
          initialValues={toEdit}
        >
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: "Adicione um nome a receita!" }]}
          >
            <Input />
          </Form.Item>
          <h3>Items</h3>
          <Form.List name="items">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "amount"]}
                        fieldKey={[field.fieldKey, "amount"]}
                        rules={[
                          { required: true, message: "Insira a quantidade" },
                        ]}
                      >
                        <InputNumber
                          min={0.001}
                          step={1}
                          placeholder="1x"
                          formatter={(value) => {
                            return value != "" ? `${value}x` : "";
                          }}
                          parser={(value) => value!.replace(/x\s?/g, "")}
                        />
                      </Form.Item>
                      {" porção de "}
                      <Form.Item
                        {...field}
                        name={[field.name, "volume"]}
                        fieldKey={[field.fieldKey, "volume"]}
                        rules={[{ required: true, message: "Defina o volume" }]}
                      >
                        <InputNumber
                          min={0.001}
                          step={1}
                          placeholder="10 (Kg, g, L ou ml)"
                          style={{ width: "150px" }}
                        />
                      </Form.Item>
                      {" de "}
                      <Form.Item
                        {...field}
                        name={[field.name, "productId"]}
                        fieldKey={[field.fieldKey, "productId"]}
                        rules={[{ required: true, message: "Escolha o item!" }]}
                      >
                        <Select
                          defaultValue="Selecione um item"
                          style={{ width: 200 }}
                        >
                          {products.map((product: Product) => (
                            <Select.Option value={product.id}>
                              {product.name} ({product.unit})
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Adicionar Item
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
          <Form.Item
            label="Tempo de preparo (forno/minutos)"
            name="preparationTime"
            rules={[
              {
                required: true,
                message: "Adicione o tempo de preparo em minutos!",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Rendimento (poções)"
            name="output"
            rules={[
              {
                required: true,
                message:
                  "Adicione a quentidade de poções na qual a receita rende!",
              },
            ]}
          >
            <InputNumber value={1} defaultValue={1} min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ok
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

interface IDispatchToProps {
  editRecipe: (recipe: Recipe) => void;
  deleteProduct: (id: string) => void;
}

function mapDispatchToProps(
  dispatch: Dispatch<RecipesAction>
): IDispatchToProps {
  return {
    editRecipe: (recipe: Recipe) => {
      dispatch(updateRecipe(recipe));
    },
    deleteProduct: (id: string) => {
      dispatch(deleteProduct(id));
    },
  };
}

interface IStateToProps {
  products: Product[];
}

function mapStateToProps(state: IPersistorState): IStateToProps {
  return {
    products: state.root.products.products,
  };
}

const RecipeEditDisplay: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeEditDisplayO);

export default withRouter(RecipeEditDisplay);
