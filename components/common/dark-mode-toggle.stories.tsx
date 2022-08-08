import DarkModeToggleComponent from "./dark-mode-toggle";
import {ComponentStory} from "@storybook/react";

export default {
    component: DarkModeToggleComponent,
    argTypes: {
        mode: {
            options: ['light', 'dark'],
            control: {type: 'radio'},
        },
    }
}

const Template: ComponentStory<typeof DarkModeToggleComponent> = (args) => <DarkModeToggleComponent {...args} />;

export const NightMode = Template.bind({});
NightMode.parameters = {
    backgrounds: { default: 'dark' },
}
NightMode.args = { mode: 'dark'};

export const DayMode = Template.bind({});
DayMode.args = { mode: 'light'};
