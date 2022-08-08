import PortfolioTotal from "./portoflio-total";
import {Meta} from "@storybook/react";

export default {
    component: PortfolioTotal
} as Meta;

const Template = (args) => <PortfolioTotal {...args}/>;

export const TotalWithZero = Template.bind({});
TotalWithZero.args = {amount: null};

export const TotalNegative = Template.bind({});
TotalNegative.args = {amount: -1};



