import Vue from 'vue'
import Single from './voip/Single.vue'
import App from "@/App.vue";
import avenginekitproxy from "@/wfc/av/engine/avenginekitproxy";

Vue.config.productionTip = false

let requestId = 0;
let getUserInfoCbMap = new Map();
let pickGroupMemberCbMap = new Map();

avenginekitproxy.listenVoipEvent('getUserInfoResult', (event, args) => {
    let {requestId, error, userInfo} = args;
    let cbs = getUserInfoCbMap.get(requestId)
    if (cbs) {
        if (!error) {
            cbs.successCB(userInfo);
        } else {
            cbs.failCB(error);
        }
        getUserInfoCbMap.delete(requestId);
    }
})
avenginekitproxy.listenVoipEvent('pickGroupMembersResult', (event, args) => {
    let {requestId, error, users} = args;
    let cb = pickGroupMemberCbMap.get(requestId)
    if (cb) {
        if (!error) {
            cb(users);
        }
        pickGroupMemberCbMap.delete(requestId);
    }
})

Vue.prototype.$getUserInfo = (userId, successCB, failCB) => {
    getUserInfoCbMap.set(requestId, {successCB, failCB});
    avenginekitproxy.emitToMain('getUserInfo', {
        userId: userId,
        requestId: requestId++
    })
}

Vue.prototype.$pickGroupMembers = (groupId, initialCheckedUsers, uncheckableUsers, successCB) => {
    pickGroupMemberCbMap.set(requestId, successCB)
    avenginekitproxy.emitToMain('pickGroupMembers', {
        groupId,
        initialCheckedUsers,
        uncheckableUsers,
        requestId: requestId++
    })
}

// this.$pickContact({
//     successCB,
//     users: this.session.groupMemberUserInfos,
//     initialCheckedUsers: [...this.session.participantUserInfos, this.session.selfUserInfo],
//     uncheckableUsers: [...this.session.participantUserInfos, this.session.selfUserInfo],
//     showCategoryLabel: false,
//     confirmTitle: '确定',
// });

new Vue({
    render: h => h(App),
}).$mount('#app')
