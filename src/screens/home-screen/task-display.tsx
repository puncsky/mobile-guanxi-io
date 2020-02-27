import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { ActiveOpacity } from "../../common/active-opacity";
import { handleTasks } from "../../common/task-util";
import { theme } from "../../common/theme";
import { Task } from "../../types/task";

export function TaskDisplay({
  tasks,
  navigation
}: {
  tasks: Array<Task>;
  navigation: NavigationScreenProp<String>;
}): JSX.Element {
  const styles = getStyles();
  const dayTasks = handleTasks(tasks);
  return (
    <View style={styles.container}>
      {dayTasks.map((dayTask, index) => {
        return (
          <TouchableOpacity
            key={`task-${index}`}
            style={styles.itemContainer}
            activeOpacity={ActiveOpacity.value}
            onPress={() =>
              navigation.navigate("TaskPredict", {
                dayTasks,
                selectedIndex: index
              })
            }
          >
            <Text style={styles.title}>{dayTask.title}</Text>
            <Text
              style={[
                styles.count,
                {
                  color: dayTask.tasks.length > 0 ? theme.primary : theme.text01
                }
              ]}
            >
              {dayTask.tasks.length}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const getStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: theme.white
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
      paddingVertical: 5
    },
    count: {
      fontSize: 16,
      paddingVertical: 10,
      fontWeight: "bold",
      color: theme.text01
    }
  });
