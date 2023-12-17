// Class to represent a row in the seat reservations grid
function SeatReservation(id, name, initialMeal) {
    var self = this;
    self.id = id;
    self.name = name;
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function() {
        var price = self.meal().price;
        return price ? "$" + price.toFixed(2) : "None";        
    });
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 1.99 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation(1, "Steve", self.availableMeals[0]),
        new SeatReservation(2, "Bert", self.availableMeals[0])
    ]);

    // Operations
    self.addSeat = function() {
        let id = self.seats()[self.seats().length - 1].id + 1;
        self.seats.push(new SeatReservation(id, "nil", self.availableMeals[0]));
    }

    self.removeSeat = function(seat) { self.seats.remove(seat) };

    self.totalSurcharge = ko.computed(function() {
        var total = 0;
        for (var i = 0; i < self.seats().length; i++)
            total += self.seats()[i].meal().price;
        return total;
    });
}

ko.applyBindings(new ReservationsViewModel());