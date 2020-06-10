import React from "react";
import { Card, Form, InputNumber, Button } from "antd";
import { Store } from "antd/lib/form/interface";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { GasAction } from "../../../reducers/gas.reducer";
import { updateGas } from "../../../actions/gas.action";
import { Gas } from "../../../types/gas.types";
import { IPersistorState } from "../../../reducers/persistor.reducer";

type Props = IStateToProps & IDispatchToProps;

class GasCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
  }

  private onFinish(store: Store) {
    const { updateGas } = this.props;

    const gas: Gas = store as Gas;
    updateGas(gas);
  }

  public render(): JSX.Element {
    const { gas } = this.props;

    return (
      <Card title="Forno" style={{ width: 350, margin: "2em auto" }}>
        <Form initialValues={gas} name="gasUsage" onFinish={this.onFinish}>
          <Form.Item
            label="Preço do botijão (13kg)"
            name="gasPrice"
            rules={[
              {
                required: true,
                message: "Adicione o valor médio do botijão de gás!",
              },
            ]}
          >
            <InputNumber prefix="R$" placeholder="75" min={0} />
          </Form.Item>
          <Form.Item
            label="Vazão de gás (kg/h)"
            name="gas"
            rules={[
              {
                required: true,
                message: "Adicione o consumo em (kg/h) do seu forno!",
              },
            ]}
            help="Encontrado na etiquetagem da maioria dos fogões e fornos a gás."
          >
            <InputNumber placeholder="0.220" step={0.01} min={0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ok
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

interface IDispatchToProps {
  updateGas: (gas: Gas) => void;
}

function mapDispatchToProps(dispatch: Dispatch<GasAction>): IDispatchToProps {
  return {
    updateGas: (gas: Gas) => {
      dispatch(updateGas(gas));
    },
  };
}

interface IStateToProps {
  gas: Gas;
}

function mapStateToProps(state: IPersistorState): IStateToProps {
  return {
    gas: state.root.gas,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GasCard);
