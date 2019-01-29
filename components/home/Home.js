import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import LaunchList from '../list';
import LaunchDetail from '../detail';

@inject('appStore')
@observer
export default class Home extends Component {
    render() {
        const { appStore } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <View style={styles.searchSortContainer}>
                        <TextInput
                            style={styles.search}
                            placeholder="Filter..."
                            onChangeText={t => appStore.setSearchText(t)} />
                        <Text style={styles.sort} onPress={() => appStore.flipSort()}>Launch Date {(appStore.sort === 'asc' ? '⬇' : '⬆')}</Text>
                    </View>
                    <LaunchList />
                </View>
                <View style={styles.detail}>
                    <LaunchDetail />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16
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