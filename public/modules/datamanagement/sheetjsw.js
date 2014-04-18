var self = this;
if (self.document === undefined)
{
	importScripts('/lib/jszip/jszip.min.js');
	importScripts('/lib/js-xls/dist/xls.js');
	importScripts('/lib/js-xlsx/dist/xlsx.js');

	addEventListener('message', function(evt) {
		var v;
		
		try { 
			if(evt.data.t == 'xls') {
				v = XLS.read(evt.data.d, {type: evt.data.b});
			} else {
				v = XLSX.read(evt.data.d, {type: evt.data.b}); 
			}
		} catch(e) { 
			postMessage({t:"e",d:e.stack}); 
		}
		
		postMessage({t:evt.data.t, d:JSON.stringify(v)});
		
		self.close();
	}, false);
}