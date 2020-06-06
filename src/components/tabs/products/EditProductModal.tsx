import { Modal, Button, Input, Form, Radio, InputNumber } from "antd";
import React, { Dispatch } from "react";
import { Product } from "../../../types/products.types";
import { Store } from "antd/lib/form/interface";
import { ProductsAction } from "../../../reducers/products.reducer";
import { updateProduct } from "../../../actions/products.action";
import { connect } from "react-redux";

interface IEditProductModalProps {
  item: Product;
  onEditItemClose: () => void;
  editItemModalVisible: boolean;
}

class EditProductModal extends React.Component<
  IDispatchToProps & IEditProductModalProps
> {
  constructor(props: IDispatchToProps & IEditProductModalProps) {
    super(props);

    this.onEditItemFinish = this.onEditItemFinish.bind(this);
  }

  private onEditItemFinish(store: Store): void {
    const { editProduct, onEditItemClose, item } = this.props;

    const product: Product = store as Product;
    product.id = item.id;

    editProduct(product);

    onEditItemClose();
  }

  public render(): JSX.Element {
    const { onEditItemClose, editItemModalVisible, item } = this.props;

    return (
      <Modal
        visible={editItemModalVisible}
        title="Editar Produto"
        onCancel={onEditItemClose}
        destroyOnClose={true}
        closable={false}
        footer={<div></div>}
      >
        <Form
          initialValues={item}
          name="editProduct"
          onFinish={this.onEditItemFinish}
        >
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
  editProduct: (product: Product) => void;
}

function mapDispatchToProps(
  dispatch: Dispatch<ProductsAction>
): IDispatchToProps {
  return {
    editProduct: (product: Product) => {
      dispatch(updateProduct(product));
    },
  };
}

export default connect(null, mapDispatchToProps)(EditProductModal);
