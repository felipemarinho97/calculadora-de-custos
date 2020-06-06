import React, { Dispatch } from "react";
import { Product } from "../../../types/products.types";
import { ProductsAction } from "../../../reducers/products.reducer";
import { updateProduct, deleteProduct } from "../../../actions/products.action";
import { connect } from "react-redux";
import { IAppState } from "../../../App";
import { List, Input } from "antd";
import ProductItem from "./ProductItem";
import { IPersistorState } from "../../../reducers/persistor.reducer";

const { Search } = Input;

interface IProductsDisplayState {
  searchTerm: string;
}

class ProductsDisplay extends React.Component<
  IDispatchToProps & IStateToProps,
  IProductsDisplayState
> {
  constructor(props: IDispatchToProps & IStateToProps) {
    super(props);

    this.state = {
      searchTerm: "",
    };

    this.onSearch = this.onSearch.bind(this);
  }

  private onSearch(value: string): void {
    this.setState({ searchTerm: value });
  }

  public render(): JSX.Element {
    const { products, deleteProduct } = this.props;
    const { searchTerm } = this.state;

    const filteredProducts: Product[] = products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(searchTerm);

    return (
      <>
        <Search
          onSearch={this.onSearch}
          placeholder="Digite o nome de um produto para pesquisar"
          style={{ width: 500, maxWidth: "70vw" }}
        />
        <List
          itemLayout="vertical"
          dataSource={filteredProducts}
          renderItem={(product) => (
            <ProductItem product={product} deleteProduct={deleteProduct} />
          )}
        />
      </>
    );
  }
}

interface IDispatchToProps {
  editProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

function mapDispatchToProps(
  dispatch: Dispatch<ProductsAction>
): IDispatchToProps {
  return {
    editProduct: (product: Product) => {
      dispatch(updateProduct(product));
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDisplay);
