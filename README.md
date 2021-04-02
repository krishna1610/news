Guidelines

1 - State defined in top level component
2 - Update state should happen in same component where its define
3 - Update state should inside a component method
4 - Move subcode to a new child component and use it in parent component
5 - In child component --> replace this.state with this.props, pass props from parent
6 - In child component --> replace this.method with this.props.method and pass method from parent
7 - Any props used in child compoment, make sure its passed from parent
