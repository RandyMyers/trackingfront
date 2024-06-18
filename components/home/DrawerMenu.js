import * as React from 'react';
import { View } from 'react-native';
import { Drawer, List, Divider } from 'react-native-paper';

const DrawerMenu = () => {
  const [active, setActive] = React.useState('');

  return (
    <Drawer.Section>
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
      {/* Add more Drawer.Items as needed */}
    </Drawer.Section>
  );
};

export default DrawerMenu;
