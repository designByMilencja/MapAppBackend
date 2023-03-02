import {AdRecord} from "../records/ad-record";
const defaultObj = {
    description: "opis",
    lat: 9,
    lon: 9,
    name: "Test Name",
    price: 6,
    url: "https://megak.pl"
}
test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);
    expect(ad.name).toBe("Test Name");
    expect(ad.description).toBe("opis");
});
test('Validates invalid price', () => {
    expect(() => new AdRecord({
    ...defaultObj,
    price: -3
})).toThrow('Cena ogłoszenia nie byc nizsza niz 0 ani wyższa niz 9999999')
})
