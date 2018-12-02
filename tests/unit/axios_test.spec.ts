import axios from 'axios';

interface StoreInterface {
    getValue(key: string): Promise<string>;
    setValue(key: string, value: string): Promise<string>;
    deleteKey(key: string): Promise<void>;
}

describe('axiosでgasを叩く', () => {
    it('test1', async () => {
        const value = await axios.get('https://script.google.com/macros/s/AKfycbyPKt_jj1wlSSl76iu8haNDSFS6b6FNki6FAlUaLsMQVW6iTcQ/exec?action=get&key=a');
        console.log(value);
    });

    /*
    it('asyncのテスト1', async() => {
        const f = async () => {
            throw "Hoge";
        };

        await f().catch( (x) => {console.log(x);});
    });

    it('asyncのテスト2', async() => {
        const f = async () => {
            throw "Piyo";
        };

        try {
            await f();
        } catch (x) {
            console.log(x);
        }
    });

    //OK
    it('asyncのテスト3', async() => {
        const f = async () => {
            throw "Fuga";
        };

        await f();
    });
    */
});
