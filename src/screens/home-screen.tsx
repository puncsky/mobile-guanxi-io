import * as React from "react";
import { useState } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import { NavigationBar } from "../common/navigation-bar";
import i18n from "../translations";

type State = {
  shouldDisplayModal: boolean;
};

export class HomeScreen extends React.Component<{}, State> {
  public state: State = {
    shouldDisplayModal: false
  };

  public render(): JSX.Element {
    return (
      <View>
        <NavigationBar title={i18n.t("home")} />
        <TaskModal />
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
