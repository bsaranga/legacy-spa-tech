// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.firstName = ko.observable("Bert");
    this.lastName = ko.observable("Bertington");
    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
    
    this.isCaps = ko.observable(false);
    
    this.capitalizeLastName = function() {
        var currentVal = this.lastName();
        if (this.isCaps()) {
            this.lastName(currentVal.toLowerCase());
            this.isCaps(false);
        }
        else {
            this.lastName(currentVal.toUpperCase());
            this.isCaps(true);
        }
    };
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());