# Table of Contents

1. [Network Protocols](#network-protocols)
   - [OSI Model](#osi-model)
   - [Client-Server vs Peer-to-Peer](#client-server-vs-peer-to-peer)
   - [Transport Layer Protocols](#transport-layer-protocols)
2. [CAP Theorem](#cap-theorem)
3. [Monolithic and Microservices Architecture](#monolithic-and-microservices-architecture)
   - [Monolithic](#monolithic)
   - [Microservices](#microservices)
   - [Challenges](#challenges)
4. [Microservices Design Patterns](#microservices-design-patterns)
   - [Strangler Pattern](#strangler-pattern)
   - [SAGA Pattern](#saga-pattern)
   - [CQRS Pattern](#cqrs-pattern)
5. [Scaling from 0 to Million Users](#scaling-from-0-to-million-users)
6. [Consistent Hashing](#consistent-hashing)
7. [Back of The Envelope Estimation](#back-of-the-envelope-estimation)
8. [SQL vs NoSQL](#sql-vs-nosql)
9. [Design A Rate Limiter](#design-a-rate-limiter)
10. [Design Idempotent POST API](#design-idempotent-post-api)
11. [Active-Passive vs Active-Active DB](#active-passive-vs-active-active-db)

---

# Network Protocols

Define the rules how systems communicate with each other over the network.

### OSI Model
7 layers: Application, Presentation, Session, Transport, Network, Data Link, Physical.

### Client-Server vs Peer-to-Peer

**Client-Server:**
- **HTTP:** 1 connection, access web pages with hypertext.
- **FTP:** 2 connections (control & data). Data connection is unencrypted (not used much now). HTTPS is preferred.
- **SMTP:** Sending mail. Used with IMAP/POP3 (receiving).
- **WebSockets:** 2-way bidirectional connection. Client or Server can initiate. Useful for chat apps (WhatsApp) to avoid polling.

**Peer-to-Peer (P2P):**
- **WebRTC:** Clients talk among themselves. Uses UDP. Used for Audio/Video streaming.

### Transport Layer Protocols

| Feature | TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| :--- | :--- | :--- |
| **Connection** | Connection-oriented | Connection-less |
| **Ordering** | Sequence numbers ensure order | No ordering guaranteed |
| **Reliability** | Acknowledgements (ACK) & Retries | Best-effort (No ACK, No Retries) |
| **Speed** | Slower (overhead) | Faster |
| **Use Case** | Web browsing, Email, File Transfer | Live Streaming, Video Calls, Gaming |

---

# CAP Theorem

The CAP Theorem states that a distributed system cannot simultaneously satisfy all three guarantees:

1.  **Consistency:** All clients see the same data at the same time.
2.  **Availability:** Every request gets a response (even if some nodes are down).
3.  **Partition Tolerance:** System continues to operate despite network partitions.

![CAP Theorem](../images/attachments/cap-theorem.svg)

> **Note:** In the real world, Partition Tolerance (P) is mandatory because networks fail. So we must choose between **CP** (Consistency + Partition Tolerance) or **AP** (Availability + Partition Tolerance).

-   **CP:** System might become unavailable to ensure data consistency.
-   **AP:** System remains available but might return stale data.

---

# Monolithic and Microservices Architecture

![Monolith vs Microservices](../images/attachments/monolith-vs-microservices.svg)

### Monolithic
All functionality (UI, Business Logic, Data Access) is in a single process/server.
-   **Disadvantages:** Hard to scale, single point of failure, tight coupling, challenging CI/CD.

### Microservices
Application is divided into smaller, independent services.
-   **Advantages:** Independent scaling, easier deployment, technology diversity, fault isolation.

### Challenges
-   **Complexity:** Distributed systems are harder to manage.
-   **Latency:** Inter-service communication adds overhead.
-   **Monitoring:** Need distributed tracing to track failures.
-   **Transaction Management:** ACID properties are hard to maintain across multiple DBs.

---

# Microservices Design Patterns

### Strangler Pattern
Used when migrating from Monolith to Microservices.
-   Route traffic gradually from the Monolith to new Microservices.
-   "Strangle" the monolith over time until it's gone.

### SAGA Pattern
Manages distributed transactions across multiple services (since we can't use a single ACID transaction).
-   **Sequence of Local Transactions:** Each service updates its DB and publishes an event.
-   **Rollback:** If a step fails, compensating transactions are executed to undo previous steps.
-   **Types:**
    -   **Choreography:** Services listen to events (Decentralized).
    -   **Orchestration:** Central coordinator tells services what to do.

### CQRS Pattern
**Command Query Responsibility Segregation**
-   Separate **Read** (Query) and **Write** (Command) models.
-   **Writes:** Handle complex logic, validation.
-   **Reads:** Optimized for retrieval (denormalized views, separate DBs).
-   Synced asynchronously via events.

---

# Scaling from 0 to Million Users

![Scaling Architecture](../images/attachments/scaling-architecture.svg)

1.  **Single Server:** App + DB on one machine.
2.  **Separate DB:** Dedicated DB server.
3.  **Load Balancer:** Distribute traffic to multiple stateless App Servers.
4.  **Database Replication:** Master-Slave setup (Master for writes, Slaves for reads).
5.  **Cache (Redis):** Store frequently accessed data in memory.
6.  **CDN:** Serve static content (images, CSS) from edge locations.
7.  **Multiple Data Centers:** Geo-routing via DNS for availability.
8.  **Message Queues (RabbitMQ/Kafka):** Asynchronous processing (Producers/Consumers).
9.  **Database Scaling:** Sharding (Horizontal scaling).

---

# Consistent Hashing

Used in Load Balancers and Distributed Caches/DBs to minimize data movement when servers are added/removed.

<img src="../images/attachments/consistent-hashing.svg" width="75%" alt="Consistent Hashing" />

-   **Concept:** Map both Keys and Servers to a circular ring (0-360°).
-   **Lookup:** Key maps to the first server found moving clockwise.
-   **Scaling:**
    -   **Add Server:** Only keys between the new server and its predecessor need moving.
    -   **Remove Server:** Keys of the removed server move to the next one.
-   **Virtual Nodes:** Use multiple virtual points for one physical server to ensure even distribution.

---

# Back of The Envelope Estimation

Rough calculations to estimate system capacity.

-   **DAU (Daily Active Users):** ~25% of Total Users.
-   **QPS (Queries Per Second):** Total Requests / Seconds in a Day (86400).
-   **Peak QPS:** ~2 * QPS.
-   **Storage:**
    -   `char` ≈ 2 bytes.
    -   `image` ≈ 300 KB.
    -   Calculate per user -> Multiply by DAU -> Multiply by retention period (years).
-   **Conversions:**
    -   1 KB = $10^3$ bytes
    -   1 MB = $10^6$ bytes
    -   1 GB = $10^9$ bytes
    -   1 TB = $10^{12}$ bytes
    -   1 PB = $10^{15}$ bytes

---

# SQL vs NoSQL

### SQL (Relational)
-   **ACID** properties (Atomicity, Consistency, Isolation, Durability).
-   **Use Case:** Financial systems, complex queries, strict data integrity.
-   **Scaling:** Vertical is easy, Horizontal is hard.

### NoSQL (Non-Relational)
-   **BASE** properties (Basically Available, Soft state, Eventual consistency).
-   **Types:**
    -   **Key-Value:** Redis, DynamoDB.
    -   **Document:** MongoDB.
    -   **Columnar:** Cassandra.
    -   **Graph:** Neo4j.
-   **Use Case:** Big Data, high throughput, flexible schema, eventual consistency is acceptable.

---

# Design A Rate Limiter

Prevents DDoS attacks and server overload (HTTP 429: Too Many Requests).

**Algorithms:**
1.  **Token Bucket:** Tokens added at rate $r$. Request consumes token.
2.  **Leaky Bucket:** Requests enter queue, processed at constant rate.
3.  **Fixed Window Counter:** Count requests in fixed time windows.
4.  **Sliding Window Log:** Track timestamps (accurate but expensive).
5.  **Sliding Window Counter:** Hybrid approach.

---

# Design Idempotent POST API

**Idempotency:** Making multiple identical requests has the same effect as a single request.
-   GET, PUT, DELETE are idempotent.
-   POST is **NOT** idempotent.

**Solution:** Use an **Idempotency Key (UUID)**.
1.  Client generates UUID and sends in header.
2.  Server checks DB/Cache:
    -   **If missing:** Create entry (Status: `Created`), process request, update status to `Consumed`, return 201.
    -   **If present & Consumed:** Return cached response (200).
    -   **If present & Created:** Return 409 Conflict (Processing).
3.  **Concurrency:** Use Mutex/Locks on the Idempotency Key to handle parallel duplicate requests.

---

# Active-Passive vs Active-Active DB

### Active-Passive
-   **Primary:** Handles Reads & Writes.
-   **Secondary:** Standby (replication). Promoted to Primary on failure.
-   **Pros:** Simple, easy conflict resolution.
-   **Cons:** Higher latency, waste of resources (secondary sits idle).

### Active-Active
-   **Multiple Primaries:** All handle Reads & Writes.
-   **Pros:** High availability, better performance.
-   **Cons:** Complex synchronization, conflict resolution needed (bi-directional syncing).
