import React, { Dispatch } from "react";
import { Product } from "../../../types/products.types";
import { ProductsAction } from "../../../reducers/products.reducer";
import { addProduct } from "../../../actions/products.action";
import { connect } from "react-redux";

interface IProductsDisplayProps {
  onAddItemClose: () => void;
  addItemModalVisible: boolean;
}

class ProductsDisplay extends React.Component<
  IDispatchToProps & IProductsDisplayProps
> {
  constructor(props: IDispatchToProps & IProductsDisplayProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div></div>;
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

export default connect(null, mapDispatchToProps)(ProductsDisplay);
