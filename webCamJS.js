import{f as e}from"./vendor.519c7c38.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const n=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,c)=>{const s=new URL(e,n);if(self[t].moduleMap[s])return o(self[t].moduleMap[s]);const d=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),r=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(d),onerror(){c(new Error(`Failed to import: ${e}`)),a(r)},onload(){o(self[t].moduleMap[s]),a(r)}});document.head.appendChild(r)})),self[t].moduleMap={}}}("/assets/");const t={apiKey:"AIzaSyAvcmHIKZga0t3WlL4z_KKAMcu3LoEXarQ",authDomain:"webrtcfirebase-b550a.firebaseapp.com",projectId:"webrtcfirebase-b550a",storageBucket:"webrtcfirebase-b550a.appspot.com",messagingSenderId:"934830999542",appId:"1:934830999542:web:435e1d5be0cae9b684a9d7",measurementId:"G-6J02EDZVRZ"};e.apps.length||e.initializeApp(t);const o=e.firestore(),n=new RTCPeerConnection({iceServers:[{urls:["stun:stun1.l.google.com:19302","stun:stun2.l.google.com:19302"]}],iceCandidatePoolSize:10});let a=null,c=null;const s=document.getElementById("webcamButton"),d=document.getElementById("webcamVideo"),r=document.getElementById("callButton"),i=document.getElementById("callInput"),l=document.getElementById("answerButton"),m=document.getElementById("remoteVideo"),p=document.getElementById("hangupButton");n.oniceconnectionstatechange=function(e){console.log("Ice connection state changed to: "+n.iceConnectionState),"connected"===n.iceConnectionState&&console.log("Successfully connected to STUN server")},s.onclick=async()=>{a=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),c=new MediaStream,a.getTracks().forEach((e=>{n.addTrack(e,a)})),n.ontrack=e=>{e.streams[0].getTracks().forEach((e=>{c.addTrack(e)}))},n.ontrack=function(e){console.log("Received remote track:",e.streams[0]),m.srcObject=e.streams[0]},n.ontrack=function(e){console.log("Received remote track:",e.streams[0]);try{m.srcObject=e.streams[0]}catch(t){console.error("Error adding remote track:",t)}},n.onerror=function(e){console.error("Peer connection error:",e)},d.srcObject=a,m.srcObject=c,r.disabled=!1,l.disabled=!1,s.disabled=!0},r.onclick=async()=>{const e=o.collection("calls").doc(),t=e.collection("offerCandidates"),a=e.collection("answerCandidates");i.value=e.id,n.onicecandidate=e=>{e.candidate&&t.add(e.candidate.toJSON())};const c=await n.createOffer();await n.setLocalDescription(c);const s={sdp:c.sdp,type:c.type};await e.set({offer:s}),e.onSnapshot((e=>{const t=e.data();if(!n.currentRemoteDescription&&(null==t?void 0:t.answer)){const e=new RTCSessionDescription(t.answer);n.setRemoteDescription(e)}})),a.onSnapshot((e=>{e.docChanges().forEach((e=>{if("added"===e.type){const t=new RTCIceCandidate(e.doc.data());n.addIceCandidate(t)}}))})),p.disabled=!1},l.onclick=async()=>{const e=i.value,t=o.collection("calls").doc(e),a=t.collection("answerCandidates"),c=t.collection("offerCandidates");n.onicecandidate=e=>{e.candidate&&a.add(e.candidate.toJSON())};const s=(await t.get()).data().offer;await n.setRemoteDescription(new RTCSessionDescription(s));const d=await n.createAnswer();await n.setLocalDescription(d);const r={type:d.type,sdp:d.sdp};await t.update({answer:r}),c.onSnapshot((e=>{e.docChanges().forEach((e=>{if(console.log(e),"added"===e.type){let t=e.doc.data();n.addIceCandidate(new RTCIceCandidate(t))}}))}))};