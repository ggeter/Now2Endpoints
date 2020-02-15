module.exports = (req, res) => {
    const {
        convertthis = '128', fromthisbase = '0123456789', tothisbase = '01'
    } = req.query;

    function convertBase(value, fromstring, tostring) {
        //var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
        //var from_range = range.slice(0, from_base);
        //var to_range = range.slice(0, to_base);

        var from_range = '%' + fromstring.split('');
        var to_range = tostring.split('');

        value = '%' + value;

        var from_base = from_range.length;
        var to_base = to_range.length;

        var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
            if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `' + digit + '` for base ' + from_base + '.');
            return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
        }, 0);

        var new_value = '';
        while (dec_value > 0) {
            new_value = to_range[dec_value % to_base] + new_value;
            dec_value = (dec_value - (dec_value % to_base)) / to_base;
        }
        return new_value || '0';
    }

    var converted = convertBase(convertthis, fromthisbase, tothisbase);
    var convertedback = convertBase(converted, tothisbase, fromthisbase)

    res.status(200).send('Converted: ' + converted + '<br>Converted Back: ' + convertedback);
}