import * as React from "react";
import { useState } from "react";
import { Query, QueryResult } from "react-apollo";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { GET_USER_TASKS } from "../../common/gqls";
import { NavigationBar } from "../../common/navigation-bar";
import { navigationBarHeight, ScreenHeight } from "../../common/screen-util";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Task } from "../../types/task";
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
    const styles = getStyles();
    return (
      <View>
        <NavigationBar title={i18n.t("home")} />
        <Query query={GET_USER_TASKS} variables={{}}>
          {({ data, loading }: QueryResult<{ getUserTasks: Array<Task> }>) => {
            if (loading) {
              return (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={theme.primary} />
                </View>
              );
            }
            const tasks = data ? data.getUserTasks : [];
            return <TaskDisplay tasks={tasks} />;
          }}
        </Query>

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

const getStyles = () =>
  StyleSheet.create({
    loadingContainer: {
      backgroundColor: theme.white,
      justifyContent: "center",
      alignItems: "center",
      minHeight: ScreenHeight - navigationBarHeight - 100
    }
  });
