# Food Order / Kitchen Display System

Prototypische Implementierung eines Bestellsystems mit zwei verschiedenen Architektur-Patterns.

## Use-Case

Bestellungen werden über Tablets aufgegeben, Kitchen Displays zeigen diese live an.

## Pattern A: Event-Driven Architecture

**Events:** `OrderPlaced`, `OrderReady`, `OrderCancelled`

```
event-driven/
├── EventBus.ts      # Publish/Subscribe Mechanismus
├── Kitchen.ts       # Subscriber: Kitchen Display
├── UI.ts            # Subscriber: Customer UI
├── OrderService.ts  # Publisher: Order Management
└── main.ts          # Demo
```

### Vorteile
- **Real-time Updates**: Subscribers werden sofort benachrichtigt
- **Lose Kopplung**: Publisher kennt Subscribers nicht
- **Skalierbarkeit**: Neue Subscribers ohne Codeänderung hinzufügbar

### Nachteile
- **Komplexität**: Event-Flow schwerer nachzuvollziehen
- **Debugging**: Asynchrone Events schwerer zu debuggen
- **Eventual Consistency**: Keine Garantie für Reihenfolge

---

## Pattern B: Client-Server (REST)

**Endpoints:** `GET /orders`, `POST /orders`, `PATCH /orders/:id`

```
client-server/
├── Server.ts   # REST API mit In-Memory Store
├── Client.ts   # HTTP Client mit Polling
└── main.ts     # Demo
```

### Vorteile
- **Einfachheit**: Request/Response leicht verständlich
- **Debugging**: Klarer Ablauf, einfach zu testen
- **Zustandslos**: Jeder Request ist unabhängig

### Nachteile
- **Polling nötig**: Für Updates muss regelmäßig abgefragt werden
- **Latenz**: Keine Echtzeit-Updates möglich
- **Traffic**: Unnötige Requests bei Polling

---

## Vergleich für den Use-Case

| Kriterium    | Event-Driven | Client-Server      |
|--------------|--------------|--------------------|
| Live Updates | Sofort       | Polling nötig      |
| Komplexität  | Höher        | Niedriger          |
| Ressourcen   | Effizient    | Polling = Overhead |
| Debugging    | Schwieriger  | Einfacher          |

**Fazit:** Für ein Kitchen Display System ist Event-Driven besser geeignet, da Echtzeit-Updates essentiell sind. Client-Server ist einfacher zu implementieren, erfordert aber Polling.

