import * as React from "react";
import { useState } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { NavigationBar } from "../../common/navigation-bar";
import i18n from "../../translations";
import { TaskDisplay } from "./task-display";
type State = {
  shouldDisplayModal: boolean;
};

type Props = {
  navigation: NavigationScreenProp<string>;
};

export class HomeScreen extends React.Component<Props, State> {
  public state: State = {
    shouldDisplayModal: false
  };

  public render(): JSX.Element {
    return (
      <View>
        <NavigationBar title={i18n.t("home")} />
        <TaskDisplay
          tasks={[
            { id: "12", due: new Date(), done: false, title: "test1" },
            { id: "1234", due: new Date(), done: false, title: "test2" }
          ]}
        />
        {/* <TaskModal /> */}
      </View>
    );
  }
}

export function TaskModal(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        presentationStyle={"pageSheet"}
        onDismiss={() => {
          setModalVisible(false);
        }}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text>Show Modal</Text>
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <Text>Hide Modal</Text>
      </TouchableHighlight>
    </View>
  );
}
