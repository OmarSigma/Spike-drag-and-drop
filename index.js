// Render the PDF viewer control
window.PdfViewerSignature = {
  viewer: {},
  pagesDraggable: [],
  isPdfViewerInyect: false,
  injectPdfViewer: function () {
    window.ej.pdfviewer.PdfViewer.Inject(
      ej.pdfviewer.Toolbar,
      ej.pdfviewer.Magnification,
      ej.pdfviewer.BookmarkView,
      ej.pdfviewer.ThumbnailView,
      ej.pdfviewer.TextSelection,
      ej.pdfviewer.TextSearch,
      ej.pdfviewer.Print,
      ej.pdfviewer.Navigation,
      ej.pdfviewer.LinkAnnotation,
      ej.pdfviewer.Annotation,
      ej.pdfviewer.FormFields,
      ej.pdfviewer.FormDesigner
    );
    this.isPdfViewerInyect = true;
  },
  activateDesignerMode: function () {
    this.viewer.designerMode = true;
  },
  desactivateDesignerMode: function () {
    this.viewer.designerMode = false;
  },
  setReadOnlyThemeVisual: function (divId) {
    this.viewer.toolbar.showToolbarItem(
      [
        'OpenOption',
        'AnnotationEditTool',
        'FormDesignerEditTool',
        'UndoRedoTool',
      ],
      false
    );
    this.viewer.enableBookmark = false;
    this.viewer.enableCommentPanel = false;
    this.viewer.enableFormFields = false;

    var toolbar = document
      .getElementById(divId)
      .getElementsByClassName('e-toolbar-left')[0];
    toolbar.className = 'e-toolbar-center';
    var commentContainer = document.getElementById(divId + '_commentContainer');
    commentContainer.style.display = 'none';
    commentContainer.previousSibling.style.display = 'none';
    commentContainer.nextSibling.style.display = 'none';
    document.getElementById(divId + '_submitForm').style.display = 'none';
    document.getElementById(divId + '_sideBarToolbar').style.display = 'none';
  },
  loadPdfViewer: function (divId, urlApi) {
    //valider s'il y a déjà un document chargé dans divId, si oui, on fait le refresh
    if (document.getElementById(divId).innerHTML != '') {
      this.viewer.unload();
      document.getElementById(divId).innerHTML = '';
    }

    //envoyer le document à la webApi pour pouvoir le visualiser
    this.viewer = new ej.pdfviewer.PdfViewer({
      //documentPath: "data:application/pdf;base64,JVBERi0xLjUNCiWDkvr+DQoxIDAgb2JqDQo8PA0KL1R5cGUgL0NhdGFsb2cNCi9QYWdlcyAyIDAgUg0KL0Fjcm9Gb3JtIDMgMCBSDQo+Pg0KZW5kb2JqDQo2IDAgb2JqDQo8PA0KL0ZpbHRlciAvRmxhdGVEZWNvZGUNCi9MZW5ndGggMTINCj4+DQpzdHJlYW0NCnheUyhU4AIAAiEAvA0KZW5kc3RyZWFtDQplbmRvYmoNCjcgMCBvYmoNCjw8DQovRmlsdGVyIC9GbGF0ZURlY29kZQ0KL0xlbmd0aCAxMg0KPj4NCnN0cmVhbQ0KeF5TCFTgAgABwQCcDQplbmRzdHJlYW0NCmVuZG9iag0KOCAwIG9iag0KPDwNCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlDQovTGVuZ3RoIDI0Mg0KPj4NCnN0cmVhbQ0KeF5tjsFqAyEYhO+C7/D3UNoe3Ghc3eSatLTXtkLP1nU3C+6autLQPn3VhEJIEBmGn5n5vjC6he1OT70F44kP7TDpaGH+maMdIXpwtouL6PcVRqyiFKrT/zerepkFzFi63LCHUYd+mOYUqWm+kaMIJoprZEkEi9EOow+YclAFPc0ub19yXN0+qy7rG4XR4tF+D8a+PW9g+35mzYwRhfxCj1E66dWaM/YpiRSNJnXTCaIlb4ioqbR12+k15cBlrlddzqqAUXHmpIfERcu++r2GuDwiCl4JJikDUIny/sU65+Hgg2tvHu4wekrYrxj9AVfzXToNCmVuZHN0cmVhbQ0KZW5kb2JqDQoxMCAwIG9iag0KPDwNCi9GaXJzdCAzMw0KL04gNQ0KL1R5cGUgL09ialN0bQ0KL0ZpbHRlciAvRmxhdGVEZWNvZGUNCi9MZW5ndGggMjg0DQo+Pg0Kc3RyZWFtDQp4Xm1Q22qDQBR8F/yH8wPWVXe9gASatlIoBTGBPkgeNnoSFoJbdC3p3/esIhrow15mmJkzuyEw14kgCLjrcAii2HUEhIy5TgZRQmSeu45//P1G8Et5xYHQh2oHqDkwqE4EX/TYGQjoVuGgx77BAfJ8t3Mdoj6xVXKv71A/MQZ2iUzYI+UhHdZfaSMN2h6zZ5pYKLzZKacHdh31XyOxNCplj6QLLX7wr65VxWcVZXeGMOXEloFk2tMlc/s2a+51c0ADtV++FuAf8W6sqqCQWSDTLAqCc+zFIpEeTy7Ck3GUeIKzGHl7kRmLINs23O6btjaSwGE8mwlb1v7AXg44jfPf8faDRjWS2Leu0a3qruB/qe65G9RCLMl/sMl5lA0KZW5kc3RyZWFtDQplbmRvYmoNCjExIDAgb2JqDQo8PA0KL1Jvb3QgMSAwIFINCi9JbmRleCBbMCAxMl0NCi9TaXplIDEyDQovVHlwZSAvWFJlZg0KL1cgWzEgMiAxXQ0KL0ZpbHRlciAvRmxhdGVEZWNvZGUNCi9MZW5ndGggNDYNCj4+DQpzdHJlYW0NCnheHcmhEQAgDMDApEXh2A3DoCzEItBDvHrgyiDoFEuUlIVs9F8zJubhAVDHA7gNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCnN0YXJ0eHJlZg0KOTk0DQolJUVPRg0K",
      documentPath: 'Hive_Succinctly.pdf',
      serviceUrl: urlApi,
      pageMouseover: function (a) {
        //console.log(a);
      },
      pageClick: function (a) {
        console.log(a.pageNumber);
        return a.pageNumber;
      },
    });

    if (!this.isPdfViewerInyect) this.injectPdfViewer();

    //lier le viewer dans divId
    this.viewer.appendTo('#' + divId);

    //changer le thème visuel
    this.activateDesignerMode();
    this.setReadOnlyThemeVisual(divId);
  },
  addSignatureFunction: function (page, x, y, signer) {
    // For initial, we can use
    // -- "initialIndicatorSettings" instead of "signatureIndicatorSettings"
    // -- "InitialField" instead of "SignatureField"

    var signatureField01 = {
      name: signer,
      pageNumber: page,
      bounds: { X: x - 100, Y: y - 20, Width: 200, Height: 40 },

      signatureIndicatorSettings: {
        //Does work
        //Apply only to the "Signature Indicator"
        color: 'c2185b',
        backgroundColor: 'green',

        // Use one invisible text to simulate an allign center : https://invisibletext.com/
        text: 'ㅤSigner iciㅤ',

        opacity: 0.95,

        // Does not work - Changing these properties has no effect
        // Will be fixed by SyncFusion
        fontSize: 10,
        height: 25,
      },
    };

    window.PdfViewerSignature.viewer.formDesignerModule.addFormField(
      'SignatureField',
      signatureField01
    );

    //So that we can move the signature Field
    window.PdfViewerSignature.viewer.designerMode = true;
  },
  addPageHandlers: function () {
    function handleDragOver(e) {
      this.classList.add('over');
      e.preventDefault();
      return false;
    }

    function handleDragEnter(e) {
      this.classList.add('over');
    }

    function handleDragLeave(e) {
      this.classList.remove('over');
    }

    function handleDrop(e) {

      function click(x,y){
        var ev = document.createEvent("MouseEvent");
        var el = document.elementFromPoint(x,y);
        ev.initMouseEvent(
            "click",
            true /* bubble */, true /* cancelable */,
            window, null,
            x, y, 0, 0, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        el.dispatchEvent(ev);
      }

      // var page = parseInt(e.currentTarget.id.split('_pageDiv_')[1]) + 1;
      var x = e.offsetX;
      var y = e.offsetY;

      var page =  click(x, y);

      var draggedElementId = e.dataTransfer.getData('draggedElementId');
      var draggedElement = document.querySelector('#' + draggedElementId);
      var signer = draggedElement.textContent;
      console.log('Page:' + page);
      console.log('X:' + e.offsetX);
      console.log('Y:' + e.offsetY);

      this.classList.remove('over');
      e.stopPropagation(); // stops the browser from redirecting.
      PdfViewerSignature.addSignatureFunction(page, x, y, signer);
      return false;
    }

    let pages = document.querySelectorAll('.e-pv-page-div');
    pages.forEach(function (page) {
      //Vérifier si les handlers ont déjà été ajoutées
      if (!PdfViewerSignature.pagesDraggable[page.id]) {
        page.addEventListener('dragover', handleDragOver);
        page.addEventListener('dragenter', handleDragEnter);
        page.addEventListener('dragleave', handleDragLeave);
        page.addEventListener('drop', handleDrop);
        PdfViewerSignature.pagesDraggable[page.id] = true;
      }
    });
  },
  addSignatureHandlers: function (selector) {
    function handleDragStart(e) {
      this.style.opacity = '0.4';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('draggedElementId', e.target.id);
      PdfViewerSignature.addPageHandlers();
    }

    function handleDragEnd(e) {
      this.style.opacity = '1';
    }

    let items = document.querySelectorAll(selector);
    items.forEach(function (item) {
      item.addEventListener('dragstart', handleDragStart);
      item.addEventListener('dragend', handleDragEnd);
    });
  },
};

window.PdfViewerSignature.loadPdfViewer(
  'PdfViewer',
  'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer'
);
window.PdfViewerSignature.addSignatureHandlers('.box');

function click(x,y){
  var ev = document.createEvent("MouseEvent");
  var el = document.elementFromPoint(x,y);
  ev.initMouseEvent(
      "click",
      true /* bubble */, true /* cancelable */,
      window, null,
      x, y, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
  );
  el.dispatchEvent(ev);
}
function click(x,y){
  var ev = document.createEvent("MouseEvent");
  var el = document.elementFromPoint(x,y);
  ev.initMouseEvent(
      "click",
      true /* bubble */, true /* cancelable */,
      window, null,
      x, y, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
  );
  el.dispatchEvent(ev);
}


