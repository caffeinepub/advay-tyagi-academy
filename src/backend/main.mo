import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
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

  // Initialize the access control state and hardcode the admin principal
  let accessControlState = AccessControl.initState();
  let hardcodedAdmin = Principal.fromText("hzsfz-kiu7s-v7ls7-t7khq-ydmaz-ycmoh-tbz6k-vydx4-7nmxd-6qcse-jae");
  accessControlState.userRoles.add(hardcodedAdmin, #admin);
  accessControlState.adminAssigned := true;
  include MixinAuthorization(accessControlState);

  // Premium user management
  public shared ({ caller }) func grantPremium(user : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can grant premium access");
    };
    premiumUsers.add(user, true);
  };

  public shared ({ caller }) func revokePremium(user : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can revoke premium access");
    };
    premiumUsers.remove(user);
  };

  public query ({ caller }) func isCallerPremium() : async Bool {
    if (caller.isAnonymous()) { return false };
    if (AccessControl.isAdmin(accessControlState, caller)) { return true };
    switch (premiumUsers.get(caller)) {
      case (?true) { true };
      case (_) { false };
    };
  };

  public query ({ caller }) func getAllPremiumUsers() : async [Principal] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view premium users");
    };
    premiumUsers.keys().toArray();
  };

  // Masterclass functions
  public shared ({ caller }) func createMasterclass(title : Text, description : Text, instructor : Text, duration : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create masterclasses");
    };

    let masterclass : Masterclass.Type = {
      id = nextMasterclassId;
      title;
      description;
      instructor;
      duration;
      price = 500;
    };
    masterclasses.add(nextMasterclassId, masterclass);
    nextMasterclassId += 1;
    masterclass.id;
  };

  public query ({ caller }) func getMasterclass(id : Nat) : async Masterclass.Type {
    switch (masterclasses.get(id)) {
      case (null) { Runtime.trap("Masterclass not found") };
      case (?masterclass) { masterclass };
    };
  };

  public query ({ caller }) func getAllMasterclasses() : async [Masterclass.Type] {
    masterclasses.values().toArray().sort();
  };

  public shared ({ caller }) func updateMasterclass(id : Nat, title : Text, description : Text, instructor : Text, duration : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update masterclasses");
    };

    switch (masterclasses.get(id)) {
      case (null) { Runtime.trap("Masterclass not found") };
      case (?_) {
        let updatedMasterclass : Masterclass.Type = {
          id;
          title;
          description;
          instructor;
          duration;
          price = 500;
        };
        masterclasses.add(id, updatedMasterclass);
      };
    };
  };

  public shared ({ caller }) func deleteMasterclass(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete masterclasses");
    };

    switch (masterclasses.get(id)) {
      case (null) { Runtime.trap("Masterclass not found") };
      case (?_) {
        masterclasses.remove(id);
      };
    };
  };

  // Geopolitics lesson functions
  public shared ({ caller }) func createGeopoliticsLesson(title : Text, content : Text, date : Time.Time, dayNumber : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create lessons");
    };

    let lesson : GeopoliticsLesson.Type = {
      id = nextGeopoliticsLessonId;
      title;
      content;
      date;
      dayNumber;
    };
    geopoliticsLessons.add(nextGeopoliticsLessonId, lesson);
    nextGeopoliticsLessonId += 1;
    lesson.id;
  };

  public query ({ caller }) func getGeopoliticsLesson(id : Nat) : async GeopoliticsLesson.Type {
    switch (geopoliticsLessons.get(id)) {
      case (null) { Runtime.trap("Lesson not found") };
      case (?lesson) { lesson };
    };
  };

  public query ({ caller }) func getAllGeopoliticsLessons() : async [GeopoliticsLesson.Type] {
    geopoliticsLessons.values().toArray().sort();
  };

  public shared ({ caller }) func updateGeopoliticsLesson(id : Nat, title : Text, content : Text, date : Time.Time, dayNumber : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update lessons");
    };

    switch (geopoliticsLessons.get(id)) {
      case (null) { Runtime.trap("Lesson not found") };
      case (?_) {
        let updatedLesson : GeopoliticsLesson.Type = {
          id;
          title;
          content;
          date;
          dayNumber;
        };
        geopoliticsLessons.add(id, updatedLesson);
      };
    };
  };

  public shared ({ caller }) func deleteGeopoliticsLesson(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete lessons");
    };

    switch (geopoliticsLessons.get(id)) {
      case (null) { Runtime.trap("Lesson not found") };
      case (?_) {
        geopoliticsLessons.remove(id);
      };
    };
  };

  // Ebook functions
  public shared ({ caller }) func createEbook(title : Text, description : Text, author : Text, pdfUrl : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create ebooks");
    };

    let ebook : Ebook.Type = {
      id = nextEbookId;
      title;
      description;
      author;
      pdfUrl;
    };
    ebooks.add(nextEbookId, ebook);
    nextEbookId += 1;
    ebook.id;
  };

  public query ({ caller }) func getEbook(id : Nat) : async Ebook.Type {
    switch (ebooks.get(id)) {
      case (null) { Runtime.trap("Ebook not found") };
      case (?ebook) { ebook };
    };
  };

  public query ({ caller }) func getAllEbooks() : async [Ebook.Type] {
    ebooks.values().toArray().sort();
  };

  public shared ({ caller }) func updateEbook(id : Nat, title : Text, description : Text, author : Text, pdfUrl : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update ebooks");
    };

    switch (ebooks.get(id)) {
      case (null) { Runtime.trap("Ebook not found") };
      case (?_) {
        let updatedEbook : Ebook.Type = {
          id;
          title;
          description;
          author;
          pdfUrl;
        };
        ebooks.add(id, updatedEbook);
      };
    };
  };

  public shared ({ caller }) func deleteEbook(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete ebooks");
    };

    switch (ebooks.get(id)) {
      case (null) { Runtime.trap("Ebook not found") };
      case (?_) {
        ebooks.remove(id);
      };
    };
  };

  // ZoomMeeting functions
  public shared ({ caller }) func createZoomMeeting(title : Text, description : Text, zoomLink : Text, scheduledDate : Time.Time) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create zoom meetings");
    };

    let zoomMeeting : ZoomMeeting.Type = {
      id = nextZoomMeetingId;
      title;
      description;
      zoomLink;
      scheduledDate;
    };
    zoomMeetings.add(nextZoomMeetingId, zoomMeeting);
    nextZoomMeetingId += 1;
    zoomMeeting.id;
  };

  public query ({ caller }) func getZoomMeeting(id : Nat) : async ZoomMeeting.Type {
    switch (zoomMeetings.get(id)) {
      case (null) { Runtime.trap("ZoomMeeting not found") };
      case (?zoomMeeting) { zoomMeeting };
    };
  };

  public query ({ caller }) func getAllZoomMeetings() : async [ZoomMeeting.Type] {
    zoomMeetings.values().toArray().sort();
  };

  public shared ({ caller }) func updateZoomMeeting(id : Nat, title : Text, description : Text, zoomLink : Text, scheduledDate : Time.Time) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update zoom meetings");
    };

    switch (zoomMeetings.get(id)) {
      case (null) { Runtime.trap("ZoomMeeting not found") };
      case (?_) {
        let updatedZoomMeeting : ZoomMeeting.Type = {
          id;
          title;
          description;
          zoomLink;
          scheduledDate;
        };
        zoomMeetings.add(id, updatedZoomMeeting);
      };
    };
  };

  public shared ({ caller }) func deleteZoomMeeting(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete zoom meetings");
    };

    switch (zoomMeetings.get(id)) {
      case (null) { Runtime.trap("ZoomMeeting not found") };
      case (?_) {
        zoomMeetings.remove(id);
      };
    };
  };

  // Enrollment functions
  public shared ({ caller }) func enrollInMasterclass(masterclassId : Nat) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Must be logged in to enroll");
    };

    switch (masterclasses.get(masterclassId)) {
      case (null) { Runtime.trap("Masterclass not found") };
      case (?_) {
        let currentEnrollments = switch (userEnrollments.get(caller)) {
          case (null) { List.empty<Nat>() };
          case (?enrollments) { enrollments };
        };

        if (currentEnrollments.contains(masterclassId)) {
          Runtime.trap("Already enrolled in this masterclass");
        };

        currentEnrollments.add(masterclassId);
        userEnrollments.add(caller, currentEnrollments);
      };
    };
  };

  public query ({ caller }) func getUserEnrollments(user : Principal) : async [Nat] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own enrollments");
    };

    switch (userEnrollments.get(user)) {
      case (null) { [] };
      case (?enrollments) { enrollments.toArray() };
    };
  };
};
