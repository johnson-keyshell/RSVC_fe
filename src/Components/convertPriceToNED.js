const convertPriceToNED = (numberString) => {
    const [wholePart, decimalPart] = numberString.split('.');
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const result = `${formattedWholePart},${decimalPart || '00'}`; // Add '00' if no decimal part
    return result;
};

export default convertPriceToNED;
