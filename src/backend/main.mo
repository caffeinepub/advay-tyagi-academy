import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

actor {
  module Masterclass {
    public type Type = {
      id : Nat;
      title : Text;
      description : Text;
      instructor : Text;
      duration : Nat;
      price : Nat;
    };
    public func compare(m1 : Type, m2 : Type) : Order.Order {
      Nat.compare(m1.id, m2.id);
    };
  };

  module GeopoliticsLesson {
    public type Type = {
      id : Nat;
      title : Text;
      content : Text;
      date : Time.Time;
      dayNumber : Nat;
    };
    public func compare(g1 : Type, g2 : Type) : Order.Order {
      Nat.compare(g1.id, g2.id);
    };
  };

  module Ebook {
    public type Type = {
      id : Nat;
      title : Text;
      description : Text;
      author : Text;
      pdfUrl : Text;
    };
    public func compare(e1 : Type, e2 : Type) : Order.Order {
      Nat.compare(e1.id, e2.id);
    };
  };

  module ZoomMeeting {
    public type Type = {
      id : Nat;
      title : Text;
      description : Text;
      zoomLink : Text;
      scheduledDate : Time.Time;
    };
    public func compare(z1 : Type, z2 : Type) : Order.Order {
      Nat.compare(z1.id, z2.id);
    };
  };

  let masterclasses = Map.empty<Nat, Masterclass.Type>();
  let geopoliticsLessons = Map.empty<Nat, GeopoliticsLesson.Type>();
  let ebooks = Map.empty<Nat, Ebook.Type>();
  let zoomMeetings = Map.empty<Nat, ZoomMeeting.Type>();
  let userEnrollments = Map.empty<Principal, List.List<Nat>>();
  let premiumUsers = Map.empty<Principal, Bool>();
  var nextMasterclassId = 1;
  var nextGeopoliticsLessonId = 1;
  var nextEbookId = 1;
  var nextZoomMeetingId = 1;

  // Keep accessControlState for stable variable compatibility with previous versions
  let accessControlState = AccessControl.initState();

  // Hardcoded admin -- direct principal comparison, no role map needed
  let hardcodedAdmin = Principal.fromText("hzsfz-kiu7s-v7ls7-t7khq-ydmaz-ycmoh-tbz6k-vydx4-7nmxd-6qcse-jae");

  func isAdmin(caller : Principal) : Bool {
    caller == hardcodedAdmin
  };

  // Direct principal comparison -- no role map, no traps, always reliable
  public query ({ caller }) func isCallerAdmin() : async Bool {
    caller == hardcodedAdmin
  };

  // Premium access management
  public shared ({ caller }) func grantPremium(user : Principal) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can grant premium access");
    };
    premiumUsers.add(user, true);
  };

  public shared ({ caller }) func revokePremium(user : Principal) : async () {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can revoke premium access");
    };
    premiumUsers.remove(user);
  };

  public query ({ caller }) func isCallerPremium() : async Bool {
    if (caller.isAnonymous()) { return false };
    if (isAdmin(caller)) { return true };
    switch (premiumUsers.get(caller)) {
      case (?true) { true };
      case (_) { false };
    };
  };

  public query ({ caller }) func getAllPremiumUsers() : async [Principal] {
    if (not isAdmin(caller)) {
      Runtime.trap("Unauthorized: Only admins can view premium users");
    };
    premiumUsers.keys().toArray();
  };

  // Masterclass functions
  public shared ({ caller }) func createMasterclass(title : Text, description : Text, instructor : Text, duration : Nat) : async Nat {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    let item : Masterclass.Type = { id = nextMasterclassId; title; description; instructor; duration; price = 500 };
    masterclasses.add(nextMasterclassId, item);
    nextMasterclassId += 1;
    item.id;
  };

  public query func getMasterclass(id : Nat) : async Masterclass.Type {
    switch (masterclasses.get(id)) {
      case (null) { Runtime.trap("Not found") };
      case (?item) { item };
    };
  };

  public query func getAllMasterclasses() : async [Masterclass.Type] {
    masterclasses.values().toArray().sort();
  };

  public shared ({ caller }) func updateMasterclass(id : Nat, title : Text, description : Text, instructor : Text, duration : Nat) : async () {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    switch (masterclasses.get(id)) {
      case (null) { Runtime.trap("Not found") };
      case (?_) { masterclasses.add(id, { id; title; description; instructor; duration; price = 500 }) };
    };
  };

  public shared ({ caller }) func deleteMasterclass(id : Nat) : async () {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    masterclasses.remove(id);
  };

  // Geopolitics lesson functions
  public shared ({ caller }) func createGeopoliticsLesson(title : Text, content : Text, date : Time.Time, dayNumber : Nat) : async Nat {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    let item : GeopoliticsLesson.Type = { id = nextGeopoliticsLessonId; title; content; date; dayNumber };
    geopoliticsLessons.add(nextGeopoliticsLessonId, item);
    nextGeopoliticsLessonId += 1;
    item.id;
  };

  public query func getGeopoliticsLesson(id : Nat) : async GeopoliticsLesson.Type {
    switch (geopoliticsLessons.get(id)) {
      case (null) { Runtime.trap("Not found") };
      case (?item) { item };
    };
  };

  public query func getAllGeopoliticsLessons() : async [GeopoliticsLesson.Type] {
    geopoliticsLessons.values().toArray().sort();
  };

  public shared ({ caller }) func updateGeopoliticsLesson(id : Nat, title : Text, content : Text, date : Time.Time, dayNumber : Nat) : async () {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    switch (geopoliticsLessons.get(id)) {
      case (null) { Runtime.trap("Not found") };
      case (?_) { geopoliticsLessons.add(id, { id; title; content; date; dayNumber }) };
    };
  };

  public shared ({ caller }) func deleteGeopoliticsLesson(id : Nat) : async () {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    geopoliticsLessons.remove(id);
  };

  // Ebook functions
  public shared ({ caller }) func createEbook(title : Text, description : Text, author : Text, pdfUrl : Text) : async Nat {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    let item : Ebook.Type = { id = nextEbookId; title; description; author; pdfUrl };
    ebooks.add(nextEbookId, item);
    nextEbookId += 1;
    item.id;
  };

  public query func getEbook(id : Nat) : async Ebook.Type {
    switch (ebooks.get(id)) {
      case (null) { Runtime.trap("Not found") };
      case (?item) { item };
    };
  };

  public query func getAllEbooks() : async [Ebook.Type] {
    ebooks.values().toArray().sort();
  };

  public shared ({ caller }) func updateEbook(id : Nat, title : Text, description : Text, author : Text, pdfUrl : Text) : async () {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    switch (ebooks.get(id)) {
      case (null) { Runtime.trap("Not found") };
      case (?_) { ebooks.add(id, { id; title; description; author; pdfUrl }) };
    };
  };

  public shared ({ caller }) func deleteEbook(id : Nat) : async () {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    ebooks.remove(id);
  };

  // Zoom meeting functions
  public shared ({ caller }) func createZoomMeeting(title : Text, description : Text, zoomLink : Text, scheduledDate : Time.Time) : async Nat {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    let item : ZoomMeeting.Type = { id = nextZoomMeetingId; title; description; zoomLink; scheduledDate };
    zoomMeetings.add(nextZoomMeetingId, item);
    nextZoomMeetingId += 1;
    item.id;
  };

  public query func getZoomMeeting(id : Nat) : async ZoomMeeting.Type {
    switch (zoomMeetings.get(id)) {
      case (null) { Runtime.trap("Not found") };
      case (?item) { item };
    };
  };

  public query func getAllZoomMeetings() : async [ZoomMeeting.Type] {
    zoomMeetings.values().toArray().sort();
  };

  public shared ({ caller }) func updateZoomMeeting(id : Nat, title : Text, description : Text, zoomLink : Text, scheduledDate : Time.Time) : async () {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    switch (zoomMeetings.get(id)) {
      case (null) { Runtime.trap("Not found") };
      case (?_) { zoomMeetings.add(id, { id; title; description; zoomLink; scheduledDate }) };
    };
  };

  public shared ({ caller }) func deleteZoomMeeting(id : Nat) : async () {
    if (not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    zoomMeetings.remove(id);
  };

  // Enrollment functions
  public shared ({ caller }) func enrollInMasterclass(masterclassId : Nat) : async () {
    if (caller.isAnonymous()) { Runtime.trap("Must be logged in") };
    switch (masterclasses.get(masterclassId)) {
      case (null) { Runtime.trap("Masterclass not found") };
      case (?_) {
        let current = switch (userEnrollments.get(caller)) {
          case (null) { List.empty<Nat>() };
          case (?e) { e };
        };
        if (current.contains(masterclassId)) { Runtime.trap("Already enrolled") };
        current.add(masterclassId);
        userEnrollments.add(caller, current);
      };
    };
  };

  public query ({ caller }) func getUserEnrollments(user : Principal) : async [Nat] {
    if (caller != user and not isAdmin(caller)) { Runtime.trap("Unauthorized") };
    switch (userEnrollments.get(user)) {
      case (null) { [] };
      case (?e) { e.toArray() };
    };
  };
};
