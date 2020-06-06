import { Modal, Button, Input, Form, Radio, InputNumber } from "antd";
import React, { Dispatch } from "react";
import { Product } from "../../../types/products.types";
import md5 from "md5";
import { Store } from "antd/lib/form/interface";
import { ProductsAction } from "../../../reducers/products.reducer";
import { addProduct } from "../../../actions/products.action";
import { connect } from "react-redux";

interface IAddProductModalProps {
  onAddItemClose: () => void;
  addItemModalVisible: boolean;
}

class AddProductModal extends React.Component<
  IDispatchToProps & IAddProductModalProps
> {
  constructor(props: IDispatchToProps & IAddProductModalProps) {
    super(props);

    this.onAddItemFinish = this.onAddItemFinish.bind(this);
  }

  private onAddItemFinish(store: Store): void {
    const { addProduct, onAddItemClose } = this.props;

    const product: Product = store as Product;

    product.id = md5(JSON.stringify(product));

    addProduct(product);

    onAddItemClose();
  }

  public render(): JSX.Element {
    const { onAddItemClose, addItemModalVisible } = this.props;

    return (
      <Modal
        visible={addItemModalVisible}
        title="Adicionar Produto"
        onCancel={onAddItemClose}
        footer={<div></div>}
      >
        <Form name="addProduct" onFinish={this.onAddItemFinish}>
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              { required: true, message: "Adicione um nome ao produto!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Preço"
            name="price"
            rules={[{ required: true, message: "Adicione o valor em R$!" }]}
          >
            <InputNumber
              formatter={(value) =>
                `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/R\$\s?|(,*)/g, "")}
              step={0.01}
              precision={2}
              style={{ width: "150px" }}
            />
          </Form.Item>

          <Form.Item
            label="Volume"
            name="volume"
            rules={[{ required: true, message: "Adicione o volume!" }]}
          >
            <InputNumber style={{ width: "150px", marginRight: "1rem" }} />
          </Form.Item>

          <Form.Item
            label="Unidade de medida"
            name="unit"
            rules={[
              {
                required: true,
                message: "Seleciona a unidade corretamente!",
              },
            ]}
          >
            <Radio.Group size="middle">
              <Radio.Button value="L">L</Radio.Button>
              <Radio.Button value="ml">ml</Radio.Button>
              <Radio.Button value="Kg">Kg</Radio.Button>
              <Radio.Button value="g">g</Radio.Button>
              <Radio.Button value="Und">Und</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ok
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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

export default connect(null, mapDispatchToProps)(AddProductModal);
