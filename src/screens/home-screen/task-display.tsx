import * as Icon from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActiveOpacity } from "../../common/active-opacity";
import { onePx, ScreenWidth } from "../../common/screen-util";
import {
  getFormatDateStr,
  getFormatTimeStr,
  handleTasks
} from "../../common/task-util";
import { theme } from "../../common/theme";
import i18n from "../../translations";
import { Task } from "../../types/task";

type Props = {
  tasks: Array<Task>;
};
type State = {
  selectedIndex: number;
  tasks: Array<Task>;
};

export class TaskDisplay extends React.Component<Props, State> {
  public state: State = {
    selectedIndex: 1,
    tasks: this.props.tasks
  };

  render(): JSX.Element {
    const styles = getStyles();
    const { selectedIndex, tasks } = this.state;
    const dayTasks = handleTasks(tasks);
    const undoneCount = dayTasks[selectedIndex].tasks.filter(task => !task.done)
      .length;

    return (
      <View style={styles.container}>
        <View style={styles.weekContainer}>
          {dayTasks.map((dayTask, index) => {
            return (
              <TouchableOpacity
                key={`week-${index}`}
                style={[
                  styles.itemContainer,
                  selectedIndex === dayTask.index && {
                    backgroundColor: theme.warning01
                  }
                ]}
                activeOpacity={ActiveOpacity.value}
                onPress={() => {
                  this.setState({ selectedIndex: dayTask.index });
                }}
              >
                <Text style={styles.title}>{dayTask.title}</Text>
                <Text
                  style={[
                    styles.count,
                    {
                      color:
                        dayTask.tasks.length > 0 ? theme.primary : theme.text01
                    }
                  ]}
                >
                  {dayTask.tasks.filter(task => !task.done).length}
                </Text>
                {selectedIndex === dayTask.index && (
                  <View style={styles.topBorder} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        {dayTasks[selectedIndex].tasks.length > 0 ? (
          <View style={styles.taskContainer}>
            <Text style={styles.dueDate}>{`${i18n.t("due")}: ${getFormatDateStr(
              dayTasks[selectedIndex]
            )}`}</Text>
            {undoneCount > 0 && (
              <Text style={styles.undoneCount}>{`${undoneCount} ${i18n.t(
                "items"
              )}`}</Text>
            )}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {dayTasks[selectedIndex].tasks.map((task, index) => {
                const itemColor = task.done ? theme.black80 : theme.text01;
                return (
                  <View key={`task-${index}`} style={styles.taskItemContainer}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: itemColor,
                        fontWeight: "bold"
                      }}
                    >
                      {task.title}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                      <Text
                        style={{ fontSize: 14, color: itemColor }}
                      >{`${i18n.t("due")} ${getFormatTimeStr(task.due)}`}</Text>
                      <TouchableOpacity
                        activeOpacity={ActiveOpacity.value}
                        style={{ paddingHorizontal: 10 }}
                        onPress={() => {
                          const tIndex = tasks.findIndex(t => t.id === task.id);
                          const clickedTask = tasks[tIndex];
                          clickedTask.done = !clickedTask.done;
                          this.setState({ tasks });
                        }}
                      >
                        <Icon.Feather
                          name={task.done ? "check-circle" : "circle"}
                          size={38}
                          color={itemColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.white,
              paddingVertical: 50
            }}
          >
            <Icon.FontAwesome
              name="database"
              size={120}
              color={theme.black80}
            />
          </View>
        )}
      </View>
    );
  }
}

const getStyles = () =>
  StyleSheet.create({
    container: {},
    weekContainer: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: theme.white,
      borderBottomWidth: onePx,
      borderBottomColor: theme.black80
    },
    itemContainer: {
      backgroundColor: theme.white,
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between"
    },
    title: {
      fontSize: 12,
      color: theme.text01,
      paddingVertical: 8
    },
    count: {
      fontSize: 16,
      paddingVertical: 10,
      fontWeight: "bold",
      color: theme.text01
    },
    topBorder: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 5,
      backgroundColor: theme.warning
    },
    taskContainer: {
      backgroundColor: theme.white,
      paddingLeft: 25
    },
    dueDate: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.text01,
      marginTop: 15
    },
    undoneCount: {
      fontSize: 12,
      color: theme.black80,
      marginTop: 2
    },
    taskItemContainer: {
      width: ScreenWidth - 25,
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10
    }
  });
