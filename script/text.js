(function() {
  var app;
  var title = document.getElementById('title');
	var cc1 = window.location.href.indexOf("#");
	var cc2 = cc1 + 1;
	if (cc2 > 2){
	var cc3 = window.location.href.slice(cc2);
	var cc4 = decodeURI(cc3);
	} else {
	var cc4 = "thêm #[chữ] vào sau text trên url để hiển thị"
	}
  $(document).ready(function() {
    return app.init();
  });

  app = {
    text: cc4,
    index: 0,
    chars: 0,
    speed: 100,
    container: ".text .content",
    init: function() {
      this.chars = this.text.length;
      return this.write();
    },
    write: function() {
      $(this.container).append(this.text[this.index]);
      if (this.index < this.chars) {
        this.index++;
        return window.setTimeout(function() {
          return app.write();
        }, this.speed);
      }
    }
  };

}).call(this);