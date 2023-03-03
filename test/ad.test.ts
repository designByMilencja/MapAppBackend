import {AdRecord} from "../records/ad-record";

test('AdRecord return data from database for one entry', async () => {
    const ad = await AdRecord.getOne('303d1380-b9c9-11ed-8ec8-7e1d1a287df9');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('303d1380-b9c9-11ed-8ec8-7e1d1a287df9');
    expect(ad.name).toBe('Domek dla lalek');
});
test('AdRecord returns null from database for no existing entry', async ()=> {
    const ad = await AdRecord.getOne('---');
    expect(ad).toBeNull();
})
