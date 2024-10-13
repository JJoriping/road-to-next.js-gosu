import { MyContextProvider } from "@/contexts/my-context";
import MinusButton from "./minus-button";
import MyComponent from "./my-component";

const RootComponent = () => {
  return <div>
    <MyContextProvider>
      <MyComponent position={0} />
      <MyComponent position={1} />
      <MyComponent position={2} />
      <MinusButton />
    </MyContextProvider>
  </div>;
};
export default RootComponent;