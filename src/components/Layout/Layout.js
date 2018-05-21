import React from "react";

import Aut from "../../hoc/Aut";

const layout = props => (
  <Aut>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </Aut>
);

export default layout;
