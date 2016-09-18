import * as angular from 'angular';
import { expect } from 'chai';
import module from '../module';
import * as sinon from 'sinon';

describe(`module: ${module.name}`, () => {

  beforeEach(() => {
    angular.mock.module(module.name);
  });

  describe('component: contactForm', () => {

    let element, scope;

    beforeEach(inject(($compile, $rootScope, Contact) => {
      scope = $rootScope.$new();
      scope.contact = new Contact({ id: 123, firstName: 'Foo' });
      scope.update = sinon.stub();

      element = angular.element(`
        <contact-form contact="contact" 
                      on-submit="update(contact)"></contact-form>
      `);

      $compile(element)(scope);
      $rootScope.$digest();
    }));

    describe('controller', () => {

      let ctrl;

      beforeEach(() => {
        ctrl = element.controller('contactForm');
      });

      it('initializes a contact copy', () => {
        expect(ctrl.originalContact).to.not.be.undefined;
        expect(ctrl.contact).to.not.be.undefined;

        expect(ctrl.contact).to.not.eq(ctrl.originalContact);
        expect(ctrl.contact.id).to.eq(ctrl.originalContact.id);
      });

      describe('.showError', () => {

        describe('when the form is not dirty', () => {

          it('returns false', () => {
            expect(ctrl.showError({ $dirty: false })).to.be.false;
          });

        });

        describe('when the form is dirty', () => {

          describe('when the field has an error', () => {

            it('returns true', () => {
              const form = { $dirty: true, foo: { $invalid: true } };
              expect(ctrl.showError(form, 'foo')).to.be.true;
            });

          });

          describe('when the field does not have an error', () => {

            it('returns false', () => {
              const form = { $dirty: true, foo: { $invalid: false } };
              expect(ctrl.showError(form, 'foo')).to.be.false;
            });

          });

        });

      });

      describe('.isPersisted', () => {

        it('returns true for a contacts with `id`', () => {
          angular.extend(ctrl.contact, { id: 123 });
          expect(ctrl.isPersisted()).to.be.true;
        });

        it('returns false for a contact without `id`', () => {
          angular.extend(ctrl.contact, { id: null });
          expect(ctrl.isPersisted()).to.be.false;
        });

      });

      describe('.submit', () => {

        it('updates a contact', () => {
          ctrl.submit();
          expect(scope.update.calledWith(ctrl.contact)).to.be.true;
        });

      });

    });

  });

});