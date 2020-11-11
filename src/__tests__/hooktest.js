import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import FilterPage from "../pages/FiltersPage";
import OptionItem from "../components/OptionItem/OptionItem";
import FilterItem from "../components/FilterItem/FilterItem";
import { filtersData } from "../constants/index";

import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const initialGlobalState = Object.entries(filtersData).reduce(
  (acc, [name]) => ({
    ...acc,
    [name]: []
  }),
  {}
);

it("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("App loads with no initial filters selected", () => {
  const wrapper = shallow(<FilterPage initialData={initialGlobalState} />);
  const text = wrapper.find(".enzyme").text();
  expect(text).toEqual("-- none --");
});

const optionMock = {
  id: "vintage",
  title: "Vintage"
};

it("Option item render title value", () => {
  const wrapper = shallow(
    <OptionItem
      isSelected={false}
      option={optionMock}
      handleSelect={() => null}
    />
  );
  const text = wrapper.find(".option-enzyme").text();
  expect(text).toEqual("Vintage");
});

//Because of React 17 it fails

// it("Render FilterPage with 7 FilterItems", () => {
//   const wrapper = mount(<FilterPage initialData={initialGlobalState} />);
//   expect(
//     wrapper
//       .find(FilterItem)
//       .render()
//       .find(".enzyme-filter-item")
//   ).to.have.lengthOf(7);
// });
