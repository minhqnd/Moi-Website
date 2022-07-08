Vue.use(Buefy);

var GuidGenerator = new Vue({
  el: '#GUIDGenerator',
  mounted: function() {
    this.GUID = this.generateUUID();
    const vm = this;
    window.addEventListener('keyup', function(event) {  
      switch(event.keyCode) {
        case 67: // c
           vm.copyToClipboard();
          break;
        case 71: // g
          vm.GUID = vm.generateUUID();
          break;
        case 72: // h
          vm.withHyphen = !vm.withHyphen;
          break;
        case 85: // u
          vm.isUpper = !vm.isUpper;
          break;
      }
    });
  },
  data: {
    isUpper: false,
    withHyphen: true,
    GUID: this.generateUUID,
  },
  methods: {
    copyToClipboard() {
        this.$refs.generator.focus();
        document.execCommand('copy');
        this.$buefy.toast.open('Copied!');
    },
    createNewUUID() {
      this.GUID = this.generateUUID();
    },
    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        var newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        
        return newGuid;
    }
  },
  computed: {
   shownUUID: function() {
     var newGuid = this.GUID;
     if(this.isUpper === true) {
          newGuid = newGuid.toUpperCase();
        }
     if(this.withHyphen === false) {
       newGuid = newGuid.replace(/[-]/g,"");
     }
     return newGuid;
   },
  }
});