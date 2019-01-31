import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import LaunchList from '../list';
import LaunchDetail from '../detail';

@inject('appStore')
@observer
export default class Home extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.list}>
                    <LaunchList />
                </View>
                <View style={styles.detail}>
                    <LaunchDetail />
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 16
    },
    list: {
        flex: 3
    },
    detail: {
        flex: 2
    },
    search: {
        borderWidth: 1,
        borderColor: 'gray',
        marginVertical: 8,
        borderRadius: 2,
        width: 256
    },
    searchSortContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sort: {
        paddingLeft: 16
    }
});