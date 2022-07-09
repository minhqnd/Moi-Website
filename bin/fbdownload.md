```js
(() => {
    let a = location.href.match(/\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/);
    if (a.length < 2) {
        console.log("Please open a video before running this script.");
        return
    }
    let c = function (d, e) {
        let f = [],
        a;
        for (a in d)
            if (d.hasOwnProperty(a)) {
                let g = e ? e + "[" + a + "]" : a,
                b = d[a];
                f.push(null !== b && "object" == typeof b ? c(b, g) : encodeURIComponent(g) + "=" + encodeURIComponent(b))
            }
        return f.join("&")
    },
    b = function (a, b) {
        return fetch("https://www.facebook.com/api/graphql/", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            body: c({
                doc_id: a,
                variables: JSON.stringify(b),
                fb_dtsg: require("DTSGInitialData").token,
                server_timestamps: !0
            })
        })
    };
    console.log("Getting info..."),
    b("5279476072161634", {
        UFI2CommentsProvider_commentsKey: "CometTahoeSidePaneQuery",
        caller: "CHANNEL_VIEW_FROM_PAGE_TIMELINE",
        displayCommentsContextEnableComment: null,
        displayCommentsContextIsAdPreview: null,
        displayCommentsContextIsAggregatedShare: null,
        displayCommentsContextIsStorySet: null,
        displayCommentsFeedbackContext: null,
        feedbackSource: 41,
        feedLocation: "TAHOE",
        focusCommentID: null,
        privacySelectorRenderLocation: "COMET_STREAM",
        renderLocation: "video_channel",
        scale: 1,
        streamChainingSection: !1,
        useDefaultActor: !1,
        videoChainingContext: null,
        videoID: a[1]
    }).then(a => a.text()).then(b => {
        try {
            let a = JSON.parse(b.split("\n")[0]),
            c = a.data.video.playable_url_quality_hd || a.data.video.playable_url;
            console.clear(),
            console.log("\u2705 Successfully retrieved download link."),
            console.log("======================="),
            console.log("%cClick this link to download: " + c, "color: green"),
            console.log("If your browser does not download automatically, please press Ctrl+S on your keyboard after followed the link above."),
            console.log("======================="),
            //console.log("\u{1F37A} If you like my tool, gimme a follow at https://fb.me/monokaijssss !! Thank yeww <3")
        } catch (d) {
            console.log("\u26A0\uFE0FFailed to extract data. Maybe this script is no longer effective.")
        }
    }).catch(a => {
        console.error("\u26A0\uFE0FFailed to get data")
    })
})()
```
