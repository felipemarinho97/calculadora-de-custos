import React from "react";
import { Product } from "../../../types/products.types";
import { List, Descriptions } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditProductModal from "./EditProductModal";

interface IProductItemProps {
  product: Product;
  deleteProduct: (id: string) => void;
}

interface IProductItemState {
  isEditModalVisible: boolean;
}

class ProductItem extends React.Component<
  IProductItemProps,
  IProductItemState
> {
  constructor(props: IProductItemProps) {
    super(props);

    this.state = {
      isEditModalVisible: false,
    };

    this.onEditItemClick = this.onEditItemClick.bind(this);
    this.onEditItemClose = this.onEditItemClose.bind(this);
  }

  private onEditItemClick(): void {
    this.setState({ isEditModalVisible: true });
  }

  private onEditItemClose(): void {
    this.setState({ isEditModalVisible: false });
  }

  public render(): JSX.Element {
    const { product, deleteProduct } = this.props;
    const { isEditModalVisible } = this.state;
    return (
      <>
        <List.Item
          key={product.id}
          actions={[
            <a onClick={this.onEditItemClick} key="list-action-edit">
              <EditOutlined />
              <span className="action-name"> Editar</span>
              <EditProductModal
                editItemModalVisible={isEditModalVisible}
                item={product}
                onEditItemClose={this.onEditItemClose}
              />
            </a>,
            <a
              onClick={() => deleteProduct(product.id)}
              key="list-action-delete"
            >
              <DeleteOutlined />
              <span className="action-name"> Apagar</span>
            </a>,
          ]}
        >
          <List.Item.Meta
            description={
              <Descriptions
                layout="vertical"
                title={product.name}
                size="small"
                bordered={true}
              >
                <Descriptions.Item label="Preço">
                  R$ {product.price.toFixed(2)}
                </Descriptions.Item>
                <Descriptions.Item label="Volume">
                  {product.volume} {product.unit}
                </Descriptions.Item>
              </Descriptions>
            }
          />
        </List.Item>
      </>
    );
  }
}

export default ProductItem;
