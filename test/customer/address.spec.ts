
import Address from '../../src/domain/entity/customer/address';

describe('Address', () => {
    let address: Address;

    beforeEach(() => {
        address = new Address('Rua A', 'Cidade A', 'Estado A', '12345-678', 10);
    });

    it('should create an instance of Address', () => {
        expect(address).toBeInstanceOf(Address);
    });

    it('should return the correct street', () => {
        expect(address.getStreet()).toBe('Rua A');
    });

    it('should return the correct city', () => {
        expect(address.getCity()).toBe('Cidade A');
    });

    it('should return the correct state', () => {
        expect(address.getState()).toBe('Estado A');
    });

    it('should return the correct zip code', () => {
        expect(address.getZipCode()).toBe('12345-678');
    });

    it('should return the correct number', () => {
        expect(address.getNumber()).toBe(10);
    });

    it('should validate the address', () => {
        expect(() => address.validate()).not.toThrow();
    });

    it('should throw an error when the street is empty', () => {
        
        expect(() => new Address('', 'Cidade A', 'Estado A', '12345-678', 10)).toThrow('Street is required');
    });

    it('should throw an error when the city is empty', () => {

        expect(() => new Address('Rua A', '', 'Estado A', '12345-678', 10)).toThrow('City is required');
    });

    it('should throw an error when the state is empty', () => {
        expect(() => new Address('Rua A', 'Cidade A', '', '12345-678', 10)).toThrow('State is required');
    });

    it('should throw an error when the zip code is empty', () => {
        expect(() => new Address('Rua A', 'Cidade A', 'Estado A', '', 10)).toThrow('ZipCode is required');
    });

    it('should throw an error when the number is empty', () => {
        expect(() =>  new Address('Rua A', 'Cidade A', 'Estado A', '12345-678', 0)).toThrow('Number is required');
    });


});

